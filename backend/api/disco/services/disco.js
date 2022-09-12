"use strict";
const _ = require("lodash");
const {getRequest} = require("../../../utils");


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async handleDiscoPayment(disco, ...args) {
    switch (disco.initial) {
      case "IKEDC": {
        return this.handleIkejaBill(disco, ...args);
      }
      case "EKEDC": {
        return this.handleEkoBill(disco, ...args);
      }
      case "AEDC": {
        return this.handleAbujaBill(disco, ...args);
      }
      case "KAEDCO": {
        return this.handleKadunaBill(disco, ...args);
      }
      case "IBEDC": {
        return this.handleIbadanBill(disco, ...args);
      }
      case "KEDC": {
        return this.handleKanoBill(disco, ...args);
      }
      case "PHEDC": {
        return this.handlePortHarcourtBill(disco, ...args);
      }
      case "JEDC": {
        return this.handleAbujaBill(disco, ...args);
      }
      default: {
        const error = new Error("Disco no found");
        error.data = {
          statusCode: 404,
        };
        throw error;
      }
    }
  },
  async handleIkejaBill(disco, meterType, customerData, amount) {
    const {
      address: customerAddress,
      name: customerName,
      user,
      customerAccountType,
      customerDtNumber,
      ...customerInfo
    } = customerData;
    let requestBody = {
      amount,
      phoneNumber: user.phoneNo,
      email: user.email,
      customerName,
      customerAddress,
      contactType: "LANLORD",
      customerAccountType,
      customerDtNumber,
    };
    if (meterType.type === "postpaid") {
      requestBody.accountNumber = customerInfo.customerAccountId;
    } else {
      requestBody.meterNumber = customerInfo.customerAccountId;
    }

    const responseData = await strapi.config.functions.handleBillPayment(
      meterType.service_id,
      requestBody
    );

    
    return {
      trans_id: responseData.trans_id,
      status: responseData.processing ? 'processing' : 'processed',
      amount,
      type: meterType.type,
      disco: disco.id,
      accountNumber: customerInfo.customerAccountId,
      token: _.get(responseData, 'details.details.creditToken', undefined),
    };
  },
  async handleEkoBill(disco, meterType, customerData, amount) {
    let requestBody;
    if(meterType.type === 'prepaid') {
        requestBody = {
            customerAddress: customerData.customerAddress,
            customerDistrict: customerData.customerDistrict,
            customerName: customerData.customerName,
            meterNumber: customerData.customerAccountId,
            amount
        }
    }else {
        requestBody = {
            customerReference: customerData.customerAccountId,
            amount
        }
    }

    const responseData = await strapi.config.functions.handleBillPayment(meterType.service_id, requestBody);

    return {
      trans_id: responseData.trans_id,
      disco: disco.id,
      status: responseData.processing ? 'processing': 'processed',
      amount,
      type: meterType.type,
      accountNumber: customerData.customerAccountId,
      token: _.get(responseData, 'details.details.standardTokenValue', _.get(responseData, 'details.details.bsstTokenValue', undefined))
    }
    
     
  },
  async handleAbujaBill(disco, meterType, customerData, amount) {
      const requestBody = {
        customerReference: customerData.customerAccountId,
        amount,
        customerName: customerData.customerName,
        customerAddress: customerData.customerAddress

      }

      const responseData = await strapi.config.functions.handleBillPayment(meterType.service_id, requestBody);
      return {
        trans_id: responseData.trans_id,
        amount,
        disco: disco.id,
        status: responseData.processing ? 'processing': 'processed',
        type: meterType.type,
        accountNumber: customerData.customerAccountId,
        token: _.get(responseData, 'details.details.token', undefined)
      }
  },
  async handleKadunaBill(disco, meterType, customerData, amount) {
    
    const requestBody = {
        meterNumber: customerData.customerAccountId,
        amount,
        customerName: customerData.customerName,
        customerAddress: customerData.customerAddress,
        tariff: customerData.tariff,
        customerMobileNumber: customerData.user.phoneNo
      }

    const responseData = await strapi.config.functions.handleBillPayment(meterType.service_id, requestBody);
    return {
      trans_id: responseData.trans_id,
      amount,
      disco: disco.id,
      status: responseData.processing ? 'processing' : 'processed',
      type: meterType.type,
      accountNumber: customerData.customerAccountId,
      token: _.get(responseData, 'details.details.token', undefined)
    }
      
  },
  async handleIbadanBill(disco, meterType, customerData, amount) {
    const requestBody = {
      customerName: customerData.customerName,
      customerReference: customerData.customerAccountId,
      thirdPartyCode: customerData.thirdPartyCode,
      serviceBand: customerData.serviceBand,
      amount
    };

    const responseData = await strapi.config.functions.handleBillPayment(meterType.service_id, requestBody);

    return {
      trans_id: responseData.trans_id,
      amount,
      disco: disco.id,
      status: responseData.processing ? 'processing' : 'processed',
      type: meterType.type,
      accountNumber: customerData.customerAccountId,
      token: _.get(responseData, 'details.details.token', undefined)
    }

  },
  async handleKanoBill(disco, meterType, customerData, amount) {
      const requestBody = {
        customerReference: customerData.customerAccountId,
        tariffCode: customerData.tariffCode,
        amount,

      }
      const responseData = await strapi.config.functions.handleBillPayment(meterType.service_id, requestBody);
      return {
        trans_id: responseData.trans_id,
        amount,
        disco: disco.id,
        status: responseData.processing ? 'processing': 'processed',
        type: meterType.type,
        accountNumber: customerData.customerAccountId,
        token: _.get(responseData, 'details.details.token', undefined)
      }
  },
  async handlePortHarcourtBill(disco, meterType, customerData, amount) {
    const requestBody = {
      customerNumber: customerData.customerAccountId,
      amount,
      customerDetails: customerData.customerDetails,
      customerEmail: customerData.user.email,
      customerPhone: customerData.user.phoneNo,
      referenceId: customerData.referenceId
    }
    const responseData = await strapi.config.functions.handleBillPayment(meterType.service_id, requestBody);
    return {
      trans_id: responseData.trans_id,
      amount,
      disco: disco.id,
      status: responseData.processing ? 'processing': 'processed',
      type: meterType.type,
      accountNumber: customerData.customerAccountId,
      token: _.get(responseData, 'details.details.token', undefined)
    }
  },
  async handleJosBill(disco, meterType, customerData, amount) {
    const requestBody = {
      accessCode: customerData.accessCode,
      customerPhoneNumber: customerData.user.phoneNo,
      amount
    };

    const responseData = await strapi.config.functions.handleBillPayment(meterType.service_id, requestBody)
    return {
      trans_id: responseData.trans_id,
      amount,
      disco: disco.id,
      status: responseData.processing ? 'processing': 'processed',
      type: meterType.type,
      accountNumber: customerData.customerAccountId,
      token: _.get(responseData, 'details.details.token', undefined)
    }
  },
};
