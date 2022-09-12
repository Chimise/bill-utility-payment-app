"use strict";
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");
const { handleError, getRequest } = require("../../../utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const modelName = 'electricity-payment';

module.exports = {
  async verifyPayment(ctx) {
    try {
      const { id } = ctx.params;
      const paymentData = strapi
        .query(modelName)
        .findOne({ id, buyer: ctx.state.user.id }); 
      if (!paymentData) {
        return ctx.notFound("Data provided could not be found");
      }
      if (paymentData.status === "processed") {
        return sanitizeEntity(paymentData, {
          model: strapi.models[modelName],
        });
      }

      const data = await strapi.services[modelName].getBills(
        paymentData.trans_id
      );
      if (!_.isObject(data.details)) {
        ctx.status = 202;
        return sanitizeEntity(paymentData, {
          model: strapi.models[modelName],
        });
      }

      const token = _.get(
        data, 
        "details.details.token",
        _.get(
          data,
          "details.details.creditToken",
          _.get(data, "details.details.standardTokenValue", undefined)
        )
      );
      const updatedPaymentData = await strapi.query(modelName).update({id}, {
        status: 'processed',
        token
      })

      return sanitizeEntity(updatedPaymentData, {model: strapi.models[modelName]});
    } catch (error) {
      console.log(error);
      return handleError(ctx, error);
    }
  },
  async findOne(ctx) {
    const {id} = ctx.params;
    const entity = await strapi.services[modelName].findOne({id, buyer: ctx.state.user.id});
    return sanitizeEntity(entity, {model: strapi.models[modelName]});
  },
  async find(ctx) {
    let entities;
    const query = {
        ...ctx.query,
        buyer: ctx.state.user.id
    }
    if(query._q) {
        entities = await strapi.services[modelName].search(query);
    }else {
        entities = await strapi.services[modelName].find(query);
    }

    return entities.map(entity => sanitizeEntity(entity, {model: strapi.models[modelName]}));
  }
};
