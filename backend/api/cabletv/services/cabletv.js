'use strict';
const {v4: uuidv4} = require('uuid');

const {postRequest} = require('../../../utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async payBills(service_id, plan, customerDetails, customerAccountId, planChanged = false) {
        const trans_id = uuidv4();

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
    }

    
};