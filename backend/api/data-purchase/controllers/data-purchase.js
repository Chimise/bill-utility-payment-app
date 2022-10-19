"use strict";
const {sanitizeEntity} = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services["data-purchase"].search({
        ...(ctx.query || {}),
        buyer: ctx.state.user.id,
      });
    } else {
      entities = await strapi.services["data-purchase"].find({
        ...(ctx.query || {}),
        buyer: ctx.state.user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["data-purchase"] })
    );
  },
};
