"use strict";
const { sanitizeEntity, parseMultipartData } = require("strapi-utils");
const yup = require("yup");
const { handleError } = require("../../../utils");

const purchaseSchema = yup.object({
  provider: yup.string().required("Please choose a provider"),
  amount: yup.number().required("Please enter the amount you want to purchase"),
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


module.exports = {
  async purchase(ctx) {
    try {
      const {
        provider: providerId,
        recipients,
        amount,
      } = await purchaseSchema.validate(ctx.request.body);
      const provider = await strapi
        .query("provider")
        .findOne({ id: providerId });
      if (!provider) {
        return ctx.badRequest("The provider was not found");
      }
      const totalPrice = (provider.airtime.charge + amount) * recipients.length;
      if (!strapi.config.functions.hasEnoughMoney(ctx, totalPrice)) {
        return ctx.paymentRequired(
          "You do not have enough money, topup and try again"
        );
      }
      const networkStatus = await strapi.config.functions.getProviderStatus(
        provider.airtime.service_id
      );
      if (!networkStatus) {
        return ctx.badImplementation(
          `Sorry, ${provider.name} airtime purchase service is currently unavailable`
        );
      }


      const createdAt = new Date().toISOString();

      const purchasePromises = recipients.map((recipient) => {
        return async () => {
          const data = await strapi.config.functions.handleAirtimePurchase(
            provider.airtime.service_id,
            recipient,
            amount
          );
          await strapi.query("user", "users-permissions").update(
            { id: ctx.state.user.id },
            {
              amount:
                ctx.state.user.amount - (amount + provider.airtime.charge),
            }
          );
          const payment = await strapi.query("airtime-purchase").create({
            trans_id: data.trans_id,
            status: data.processing ? "processing" : "processed",
            provider: provider.id,
            recipient: recipient,
            amount,
            buyer: ctx.state.user.id,
            createdAt,
          });
          return payment;
        };
      });

      const purchases = await Promise.all(purchasePromises);
      return purchases.map((purchase) =>
        sanitizeEntity(purchase, { model: strapi.models["airtime-purchase"] })
      );
    } catch (error) {
      console.log(error);
      return handleError(ctx, error);
    }
  },
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.buyer = ctx.state.user.id;
      entity = await strapi.services["airtime-purchase"].create(data, {
        files,
      });
    } else {
      ctx.request.body.buyer = ctx.state.user.id;
      entity = await strapi.services["airtime-purchase"].create(
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models["airtime-purchase"] });
  },
  async update(ctx) {
    const id = ctx.params.id;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.buyer = ctx.state.user.id;
      entity = await strapi.services["airtime-purchase"].update({ id }, data, {
        files,
      });
    } else {
      ctx.request.body.buyer = ctx.state.user.id;
      entity = await strapi.services["airtime-purchase"].update(
        { id },
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models["airtime-purchase"] });
  },
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services["airtime-purchase"].search({
        ...(ctx.query || {}),
        buyer: ctx.state.user.id,
      });
    } else {
      entities = await strapi.services["airtime-purchase"].find({
        ...(ctx.query || {}),
        buyer: ctx.state.user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["airtime-purchase"] })
    );
  },
};
