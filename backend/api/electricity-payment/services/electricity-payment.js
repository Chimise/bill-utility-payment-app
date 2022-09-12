'use strict';
const {getRequest} = require('../../../utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async getBills(trans_id) {
        const response = await getRequest(`/services/query?trans_id=${trans_id}`);
        
        return response.json();
    }
};
