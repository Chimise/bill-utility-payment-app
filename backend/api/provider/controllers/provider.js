"use strict";
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

const { handleError } = require("../../../utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.provider.search(ctx.query);
    } else {
      entities = await strapi.services.provider.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.provider })
    );
  },
  async plan(ctx) {
    const { id } = ctx.params;
    try {
      const provider = await strapi.query("provider").findOne({ id });
      if (!provider) {
        return ctx.badRequest("Provider not found");
      }

      let existingPlans = provider.plans;

      const plans = await strapi.services.provider.getAllPlans(
        provider.data.service_id
      );
      console.log(plans);
      if (!strapi.services.provider.isPlanEqual(existingPlans, plans)) {
        const {newPlans, modifiedPlans} = strapi.services.provider.modifyPlans(
          provider.plans,
          plans,
          provider.data.charge
        );
        console.log(newPlans);
        
        if(newPlans.length > 0) {
          const plansWithProvider = newPlans.map(newPlan => ({...newPlan, provider: provider.id}));
          await strapi.query('plan').model.insertMany(plansWithProvider);
        }
        if(modifiedPlans.length > 0) {
          const promise = modifiedPlans.map(({id, ...plan}) => {
            return strapi.query('plan').update({id}, plan);
          })
          await Promise.all(promise);
          
        }
        existingPlans = await strapi.query('plan').find({provider: provider.id});
      }

      return existingPlans.map(existingPlan => sanitizeEntity(existingPlan, {model: strapi.models.plan}));
      
    } catch (error) {
      console.log(error);
      return handleError(ctx, error);
    }
  },
};
