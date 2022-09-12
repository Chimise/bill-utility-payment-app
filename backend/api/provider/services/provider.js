'use strict';
const _ = require('lodash');
const { postRequest } = require('../../../utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async getAllPlans(service_id) {
        const response = await postRequest('/services/packages', {
            body: {
                service_id,
                requestType: 'SME'
            }
        });
        const responseData = await response.json();
        console.log(responseData);
        let plans = responseData.details;
        if(!_.isArray(plans)) {
            plans = [];
        }
        
        return plans;
    },
    isPlanEqual(oldPlans, newPlans) {
        return newPlans.every(newPlan => {
            const plan  = oldPlans.find(oldPlan => {
                if(!_.isObject(oldPlan)) {
                    return;
                }
                return oldPlan.code === newPlan.code;
            });
            if(!plan) {
                return false;
            }

            const oldPlan = {
                cost: plan.cost.toString(),
                value: plan.value.toString()
            }
            
            return _.isEqual(_.pick(newPlan, ['cost', 'value']), oldPlan);
        });
    },
    modifyPlans(oldPlans, newPlans, charge) {
        const plans = newPlans.map(plan => {
            const similarPlan = oldPlans.find(oldPlan => {
                if(!_.isObject(oldPlan)) {
                    return;
                }
                return oldPlan.code === plan.code;
            });
            const cost = parseInt(plan.cost);
            const value = parseInt(plan.value);
            if(!similarPlan) {
                return {
                    code: plan.code,
                    price: cost + charge,
                    value,
                    cost
                };
            }

            return {
                id: similarPlan.id,
                value,
                cost,
                price: cost > similarPlan.price ? cost + charge : similarPlan.price
            };

        })
        return {
            newPlans: plans.filter(plan => !plan.id),
            modifiedPlans: plans.filter(plan => plan.id)
        }
    }
};
