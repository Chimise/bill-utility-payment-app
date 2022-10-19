'use strict';
const {postRequest, generateUniqueNumber, RequestError} = require('../../../utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async purchaseData(plan, phoneNumber) {
        const trans_id = generateUniqueNumber();

        const response = await postRequest('/services/', {
            body: {
                service_id: plan.provider.data_id,
                service_type: plan.type,
                beneficiary: phoneNumber,
                trans_id,
                code: plan.data_id,
                amount: plan.const
            }
        });

        const purchaseData = await response.json();

        if(purchaseData.message === 'failure') {
            throw new RequestError(response);
        }

        if(response.status === 202 || purchaseData.statusCode === '202') {
            purchaseData.processing = true;
        }
        purchaseData.trans_id = trans_id;

        return purchaseData;
    }
};
