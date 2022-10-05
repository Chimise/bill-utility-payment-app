"use strict";
const { sanitizeEntity } = require("strapi-utils");
const yup = require("yup");

const { handleError } = require("../../../utils");

const purchaseSchema = yup.object({
  recipients: yup
    .array(
      yup
        .string()
        .matches(
          new RegExp("(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)"),
          "Please enter a valid Nigerian number"
        )
    )
    .min(1, "Choose at least one recipient")
    .required("Please enter your recipients"),
});

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async purchase(ctx) {
    const { id } = ctx.state.user;
    const planId = ctx.params.id;

    try {
      const {recipients} = await purchaseSchema.validate(ctx.request.body);
      // Check whether the Plan Id provided is valid
      const plan = await strapi.query("plan").findOne({ id: planId });
      if (!plan) {
        return ctx.badRequest("Data not found");
      }

      const totalPrice = recipients.length * plan.selling_price;
      if (!strapi.config.functions.hasEnoughMoney(ctx, totalPrice)) {
        return ctx.paymentRequired(
          "You do not have enough money, topup and try again"
        );
      }

      const networkStatus = await strapi.config.functions.getProviderStatus(plan.provider.data_id, plan.type);

      if(!networkStatus) {
        return ctx.badImplementation(`${plan.provider.name} service currently unavailable, try again later`);
      };

      const createdAt = new Date().toISOString();

      const purchasePromises = recipients.map((recipient) => {
        return (async () => {
          const data = await strapi.services.plan.purchaseData(plan, recipient);
          const user = await strapi.query('user', 'users-permissions').update({id: ctx.state.user.id}, {
            amount: ctx.state.user.amount - (plan.selling_price || (plan.cost + plan.provider.data_charge))
          });
          const purchase = await strapi.query('data-purchase').create({
            trans_id: data.trans_id,
            plan: plan.id,
            buyer: user.id,
            recipient,
            status: data.processing ? 'processing' : 'processed',
            createdAt
          })
          return purchase;
        })()
      });

      const purchases = await Promise.all(purchasePromises);

      const sanitizedPurchases = purchases.filter(purchase => purchase).map(purchase => sanitizeEntity(purchase, {model: strapi.models['data-purchase']}));
      if(sanitizedPurchases.length === 0) {
        return ctx.badImplementation("An error occured, please try again");
      }

      return sanitizedPurchases;
      
    } catch (error) {
      console.log(error);
      return handleError(ctx, error);
    }
  },
};
