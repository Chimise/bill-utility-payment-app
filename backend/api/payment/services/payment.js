'use strict';
const {getPaystackRequest, postPaystackRequest} = require('../../../utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async verifyPayment(reference) {
        const response = await getPaystackRequest(`/transaction/verify/${reference}`);
        const responseData = await response.json();
        return {
            amount: (responseData.data.amount / 100) - responseData.data.fees,
            method: responseData.data.channel,
            createdAt: responseData.data.paid_at,
        }
    },
    getLocalCharges(amount) {
        let charge = (1.5/100) * amount;
        if(amount >= 2500) {
            charge += 100;
        }

        if(charge > 2000) {
            charge = 2000
        }

        return Math.ceil(charge);
    },
    getDedicatedAccountCharges(amount) {
        let charge = (1/100) * amount;
        if(charge > 300) {
            charge = 300;
        }
        return Math.ceil(charge);
    },
    async createCustomer(email, firstName, lastName, phoneNo) {
        const response = await postPaystackRequest('/customer', {
            body: {
                email,
                first_name: firstName,
                last_name: lastName,
                phone: phoneNo
            }
        });

        const data = await response.json();
        return data.data.customer_code;
    },
    async createVirtualAccount(customerCode) {
        const response = await postPaystackRequest('/dedicated_account', {
            body: {
                customer: customerCode,
                preferred_bank: 'test-bank'
            }
        });
        const responseData = await response.json();
        return  responseData.data.account_name; 
    }
};
