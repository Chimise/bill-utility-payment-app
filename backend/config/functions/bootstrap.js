"use strict";
const response = require('../../utils/plans');
const plans = require('../../utils/plans.json').plans;



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
    const providers = await strapi.query('provider').find({});
    const originalPlans = await strapi.query('plan').find({});
    
    if(originalPlans.length === 0) {
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

};

// {
//     "code": "MG1500",
//     "airtime_cost": "1000",
//     "cost": "950",
//     "value": "1500",
//     "network": "MTN",
//     "package": "Gifting",
//     "validity": "Monthly",
//     "status": "1"
//   },
