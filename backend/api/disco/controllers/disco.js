"use strict";
const yup = require("yup");
const _ = require('lodash');
const {sanitizeEntity} = require('strapi-utils');

const { handleError, postRequest } = require("../../../utils");

const paymentSchema = yup.object({
  amount: yup.number().required("Please enter the amount you want to recharge"),
  customerAccountId: yup.string().required(),
  type: yup
    .string()
    .required("Enter your meter type")
    .oneOf(["prepaid", "postpaid"]),
});

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async payment(ctx) {
    try {
      const { id } = ctx.params;
      const { amount, customerAccountId, type } = await paymentSchema.validate(
        ctx.request.body
      );
      const disco = await strapi.query("disco").findOne({ id });
      if (!disco) {
        return ctx.notFound("The data was not found");
      }
      if (!strapi.config.functions.hasEnoughMoney(ctx, disco.charge + amount)) {
        return ctx.paymentRequired("Please Fund your Wallet");
      }

      const meterType = disco.meterType.find((meter) => meter.type === type);

      const customerData = await strapi.config.functions.getCustomerInfo(
        meterType.service_id,
        customerAccountId
      );
      console.log(customerData);

        // Get the customerData from the response, might be in the details or data field

      const details = _.get(customerData, 'details', _.get(customerData, 'data', ''));
      if(!_.isObject(details)) {
        return ctx.notFound("The Card No details you entered was not found");

      }

      const getMinName = Object.keys(details).find((key) => key.startsWith('min'));

      const minimumAmount = details[getMinName] || meterType.min_amount || 100;
      
      if(amount < minimumAmount) {
          return ctx.badRequest(`Your amount should be greater than ${minimumAmount}`);
      }

      details.user = ctx.state.user;
      details.customerAccountId = customerAccountId;

      const paymentData = await strapi.services.disco.handleDiscoPayment(disco, meterType, details, amount);

      await strapi.query('user', 'users-permissions').update({id: ctx.state.user.id}, {
        amount: ctx.state.user.amount - (amount + disco.charge)
      })
      const cableTvPayment = await strapi.query('electricity-payment').create({
        buyer: ctx.state.user.id,
        ...paymentData
      })
      ctx.status = paymentData.status === 'processing' ? 202 : 200;
      return sanitizeEntity(cableTvPayment, {model: strapi.models['electricity-payment']});
      
    } catch (error) {
      console.log(error);
      return handleError(ctx, error);
    }
  },
};


