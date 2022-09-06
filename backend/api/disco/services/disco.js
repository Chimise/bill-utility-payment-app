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

    if (responseData.processing) {
      throw new Error("The transaction was not completed");
    }
    return {
      trans_id: _.get(responseData, "details.trans_id"),
      status: "processed",
      amount,
      type: meterType.name,
      disco,
      accountNumber: customerInfo.customerAccountId,
      token: _.get(responseData, 'details.details.creditToken', ''),
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
      trans_id: _.get(responseData, 'details.trans_id', _.get()),
      disco,
      status: responseData.processing ? 'processing': 'processed',
      amount,
      type: meterType.name,
      accountNumber: customerData.customerAccountId,
      token: _.get(responseData, 'details.details.standardTokenValue', _.get(responseData, 'details.details.bsstTokenValue', ''))
    }
    
     
  },
  async handleAbujaBill(disco, meterType, customerData) {

  },
  async handleKadunaBill(disco, meterType, customerData) {

  },
  async handleIbadanBill(disco, meterType, customerData) {},
  async handleKanoBill(disco, meterType, customerData) {},
  async handlePortHarcourtBill(disco, meterType, customerData) {},
  async handleJosBill(disco, meterType, customerData) {},
};
