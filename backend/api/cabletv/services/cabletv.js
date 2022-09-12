'use strict';
const _ = require('lodash');
const {postRequest, generateUniqueNumber} = require('../../../utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async payBills(service_id, plan, customerDetails, customerAccountId, planChanged = false) {
        const trans_id = generateUniqueNumber();

        const response = await postRequest('/services', {
            body: {
                service_id,
                trans_id,
                customerNumber: customerDetails.customerNumber,
                customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                amount: plan.price,
                smartCardNumber: customerAccountId,
                ...(!planChanged ? { productCode: plan.productCode } : {}),
            }
        })

        const data = await response.json();
        if(response.status === 202 || data.statusCode === "202") {
            data.processing = true;
        };
        data.trans_id = trans_id;
        return data;
    },
    comparePlan(oldPlans, newPlans) {
        return newPlans.every(plan => {
            const similarPlan = oldPlans.find(oldPlan => {
                if(!_.isObject(oldPlan)) {
                    return;
                }
                return oldPlan.productCode === plan.productCode;
            });
            if(!similarPlan) {
                return false;
            }
            const filteredPlan = _.pick(similarPlan, ['price', 'name', 'productCode']);
            return _.isEqual(plan, filteredPlan);
        })
    },
    async getPlans(service_id) {
        const response = await postRequest('/services/packages', {
            body: {
                service_id
            }
        });

        const data = await response.json();
        return data.details;
    },
    modifyPlans(oldPlans, newPlans, charge) {
        return newPlans.map(plan => {
            const similarPlan = oldPlans.find(oldPlan => {
                if(!_.isObject(oldPlan)) {
                    return;
                }
                return oldPlan.productCode === plan.productCode;
            });
            if(!similarPlan) {
                return {
                    ...plan,
                    selling_price: plan.price + charge
                };
            }

            return {
                id: similarPlan.id,
                ...plan,
                selling_price: plan.price > similarPlan.selling_price ? plan.price + charge : similarPlan.selling_price
            };

        })
    }
    
};