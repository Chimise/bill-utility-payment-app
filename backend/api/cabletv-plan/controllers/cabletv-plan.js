"use strict";
const { sanitizeEntity } = require("strapi-utils");
const yup = require("yup");
const _ = require("lodash");
const { handleError } = require("../../../utils");


const purchaseSchema = yup.object({
  customerAccountId: yup.string().required("Please enter your card No"),
  id: yup.string().required()
});

module.exports = {
  async purchase(ctx) {
    try {

      const {id, customerAccountId} = await purchaseSchema.validate(ctx.request.body);
      const plan = await strapi.query("cabletv-plan").findOne({ id });

      if(!plan) {
        return ctx.badRequest("Data not found");
      }

      if (!strapi.config.functions.hasEnoughMoney(ctx, plan.selling_price)) {
        return ctx.paymentRequired("Please fund your wallet");
      }

      const customerData = await strapi.config.functions.getCustomerInfo(
        plan.cabletv.service_id,
        customerAccountId
      );

      if (!_.isObject(customerData.details)) {
        return ctx.notFound("Please enter a valid IUC No");
      }

      let purchaseData;
      try {
        purchaseData = await strapi.services['cabletv-plan'].payBills(
          plan.cabletv.service_id,
          plan,
          customerData.details,
          customerAccountId
        );
      } catch (error) {
        purchaseData = await strapi.services['cabletv-plan'].payBills(
          plan.cabletv.service_id,
          plan,
          customerData.details,
          customerAccountId,
          true
        );
      }

      await strapi.query("user", "users-permissions").update(
        { id: ctx.state.user.id },
        {
          amount: ctx.state.user.amount - plan.selling_price,
        }
      );

      const payment = await strapi.query("cabletv-payment").create({
        trans_id: purchaseData.trans_id,
        buyer: ctx.state.user.id,
        status: purchaseData.processing ? "processing" : "processed",
        plan: plan.id,
        cardNo: customerAccountId,
      });

      const sanitizedPayment = sanitizeEntity(payment, {
        model: strapi.models["cabletv-payment"],
      });

      return sanitizedPayment;
    } catch (error) {
      console.log(error);
      return handleError(ctx, error);
    }
  },


};
