"use strict";
const yup = require("yup");
const _ = require('lodash');

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

        // Get the customerData from the response, might be in the details or data field

      const details = _.get(customerData, 'details', _.get(customerData, 'data', ''));
      if(!_.isObject(details)) {
        return ctx.notFound("The Card No details you entered was not found");
      }

      const minimumAmount = _.get(details, 'minimumAmount', _.get(meterType, 'min_amount', 250));
      
      if(amount < minimumAmount) {
          return ctx.badRequest(`Your amount should be greater than ${minimumAmount}`);
      }

      details.user = ctx.state.user;
      details.customerAccountId = customerAccountId;

      const response = await strapi.services.disco.handleDiscoPayment(disco, meterType, details, amount);
    } catch (error) {
      console.log(error);
      return handleError(ctx, error);
    }
  },
};


