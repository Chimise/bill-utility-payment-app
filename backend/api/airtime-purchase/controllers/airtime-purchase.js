"use strict";
const { sanitizeEntity, parseMultipartData } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async purchase(ctx) {
    const { id } = ctx.params;
    const plan = strapi.query("airtime-purchase").findOne({ id });
    if (!id) {
      return ctx.notFound("Data plan not found");
    }

    return {
      message: "Things are going on well",
    };
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
