"use strict";
const { sanitizeEntity } = require("strapi-utils");
const yup = require("yup");
const _ = require("lodash");
const { handleError } = require("../../../utils");

const querySchema = yup.object({
  customerAccountId: yup.string().required(),
});

const purchaseSchema = yup.object({
  customerAccountId: yup.string().required("Please enter your card No"),
  planId: yup.string().required(),
  currentPlanId: yup.string().optional(),
});

module.exports = {
  async plan(ctx) {
    try {
      const query = await querySchema.validate(ctx.query);
      let cableTv = await strapi
        .query("cabletv")
        .findOne({ id: ctx.params.id });
      if (!cableTv) {
        return ctx.notFound("The CableTv plan was not found");
      }

      const newPlans = await strapi.services.cabletv.getPlans(
        cableTv.service_id
      );

      const isEqual = strapi.services.cabletv.comparePlan(
        cableTv.plans,
        newPlans
      );

      if (!isEqual) {
        const modifiedPlans = strapi.services.cabletv.modifyPlans(
          cableTv.plans,
          newPlans,
          cableTv.charge
        );
        cableTv = await strapi.query("cabletv").update(
          { id: cableTv.id },
          {
            plans: modifiedPlans,
          }
        );
      }

      const customerAccount = await strapi.config.functions.getCustomerInfo(
        cableTv.service_id,
        query.customerAccountId,
        true
      );

      let currentPlan;

      if (_.isObject(customerAccount.details)) {
        currentPlan = customerAccount.details.price;
      }
      const sanitizedCableTv = sanitizeEntity(cableTv, {
        model: strapi.models.cabletv,
      });
      const plans = sanitizedCableTv.plans.map((plan) => {
        if (plan.price === currentPlan) {
          return {
            ...plan,
            currentPlan: true,
          };
        }
        return plan;
      });

      return plans;
    } catch (error) {
      console.log(error);
      return handleError(ctx, error);
    }
  },
  async purchase(ctx) {
    try {
      const id = ctx.params.id;

      const body = await purchaseSchema.validate(ctx.request.body);
      const cableTv = await strapi.query("cabletv").findOne({ id });
      if (!cableTv) {
        return ctx.notFound("The data you provided was not found ");
      }
      const plan = cableTv.plans.find((plan) => plan.id === body.planId);
      if (!plan) {
        return ctx.notFound("The data you provided was not found ");
      }

      if (!strapi.config.functions.hasEnoughMoney(ctx, plan.selling_price)) {
        return ctx.paymentRequired("Please fund your wallet");
      }

      const planChanged =
        body.currentPlanId && body.planId !== body.currentPlanId;

      const customerData = await strapi.config.functions.getCustomerInfo(
        cableTv.service_id,
        body.customerAccountId
      );

      if (!_.isObject(customerData.details)) {
        return ctx.notFound("Please enter a valid IUC No");
      }

      const purchaseData = await strapi.services.cabletv.payBills(
        cableTv.service_id,
        plan,
        customerData.details,
        body.customerAccountId,
        planChanged
      );

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
        planId: plan.id,
        cardNo: body.customerAccountId,
        cabletv: cableTv.id,
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
