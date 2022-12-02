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
            amount: Math.ceil((responseData.data.amount - responseData.data.fees) / 100),
            method: responseData.data.channel,
            createdAt: new Date(responseData.data.paidAt),
            status: responseData.data.status
        }
    },
    getLocalCharges(amount) {
        let charge = Math.round((1.5/100) * (amount * 100));
        if(amount >= 250000) {
            charge += 10000;
        }

        if(charge > 200000) {
            charge = 200000
        }

        return charge / 100;
    },
    getDedicatedAccountCharges(amount) {
        let charge = Math.round((1/100) * (amount * 100));
        if(charge > 30000) {
            charge = 30000;
        }
        return charge / 100;
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
        console.log(data);
        return data.data.id;
    },
    async createVirtualAccount(customerCode, bank = 'test-bank') {
        const response = await postPaystackRequest('/dedicated_account', {
            body: {
                customer: customerCode,
                preferred_bank: bank
            }
        });
        const responseData = await response.json();
        return {
            name: responseData.data.account_name,
            account_number: responseData.data.account_number,
            account_id: responseData.data.id,
            bank: responseData.data.bank.name
        }; 
    }
};
