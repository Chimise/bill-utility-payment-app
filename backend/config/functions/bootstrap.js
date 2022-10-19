"use strict";
const plans = require('../../utils/plans.json').plans;
const cabletvPlans = require('../../utils/cabletvs.json').plans;



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
    
    const originalPlans = await strapi.query('plan').find({});
    const previousPlans = await strapi.query('cabletv-plan').find({});
    
    if(originalPlans.length === 0) {
        const providers = await strapi.query('provider').find({});
        const newPlans = plans.map(plan => {
            const provider = providers.find(prov => prov.name.toLowerCase() === plan.network.toLowerCase());
            const cost = parseInt(plan.cost);
            const value = parseInt(plan.value);
            const selling_price = parseInt(plan.airtime_cost);
            return {
                data_id: plan.code,
                type: plan.package.toUpperCase(),
                provider: provider.id,
                selling_price: selling_price || (cost + provider.data_charge),
                cost,
                value,
                validity: plan.validity || "Monthly"
            }
        });
        await strapi.query('plan').model.insertMany(newPlans);
    }

    if(previousPlans && previousPlans.length === 0) {
        const cabletvs = await strapi.query('cabletv').find({});
        const modifiedPlans = cabletvPlans.map(plan => {
            const cabletv = cabletvs.find(cabletv => plan.name.toLowerCase().startsWith(cabletv.name.toLowerCase()));
            return {
                ...plan,
                selling_price: plan.price,
                cabletv: cabletv.id
            }
        });
    
        await strapi.query('cabletv-plan').model.insertMany(modifiedPlans);
    }

};


