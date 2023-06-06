"use strict";
const plans = require("../../utils/plans.json").plans;
const cabletvPlans = require("../../utils/cabletvs.json").plans;
const cachedCabletvs = require("../../utils/cabletv.json").cabletvs;
const cachedDiscos = require("../../utils/discos.js");
const cachedPaymentMethods = require("../../utils/methods.json").methods;
const cachedProviders = require("../../utils/providers.json").providers;
const meters = require("../../utils/meters.js");


/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
  console.log(process.env.DATABASE_URI);
  
  let providers = await strapi.query("provider").model.find({});
  let cabletvs = await strapi.query("cabletv").model.find({});
  const discos = await strapi.query("disco").model.find({});
  const paymentMethods = await strapi.query("paymentmethod").model.find({});

  if (providers.length === 0) {
    await strapi.query("provider").model.insertMany(cachedProviders);
    providers = await strapi.query("provider").find({});
    const newPlans = plans.map((plan) => {
      const provider = providers.find(
        (prov) => prov.name.toLowerCase() === plan.network.toLowerCase()
      );
      const cost = parseInt(plan.cost);
      const value = parseInt(plan.value);
      const selling_price = parseInt(plan.airtime_cost);
      return {
        data_id: plan.code,
        type: plan.package.toUpperCase(),
        provider: provider.id,
        selling_price: selling_price || cost + provider.data_charge,
        cost,
        value,
        validity: plan.validity || "Monthly",
      };
    });
    await strapi.query("plan").model.insertMany(newPlans);
  }
  if (cabletvs.length === 0) {
    await strapi.query("cabletv").model.insertMany(cachedCabletvs);
    cabletvs = await strapi.query("cabletv").find({});
    const modifiedPlans = cabletvPlans.map((plan) => {
      const cabletv = cabletvs.find((cabletv) =>
        plan.name.toLowerCase().startsWith(cabletv.name.toLowerCase())
      );
      return {
        ...plan,
        selling_price: plan.price,
        cabletv: cabletv.id,
      };
    });

    await strapi.query("cabletv-plan").model.insertMany(modifiedPlans);
  }

  if (discos.length === 0) {
    await strapi.query("disco").model.insertMany(cachedDiscos);
    await strapi.query("meter").model.insertMany(meters);
  }

  if (paymentMethods.length === 0) {
    await strapi.query("paymentmethod").model.insertMany(cachedPaymentMethods);
  }
};
