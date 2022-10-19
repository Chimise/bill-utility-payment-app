'use strict';
const {sanitizeEntity} = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const modelName = 'cabletv-payment';

module.exports = {
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
    },
    async findOne(ctx) {
        const {id} = ctx.params;
        const entity = await strapi.services[modelName].findOne({id, buyer: ctx.state.user.id});
        if(!entity) {
            return ctx.badRequest("Data not found");
        }
        return sanitizeEntity(entity, {model: strapi.models[modelName]});
    }
};
