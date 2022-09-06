const {postRequest} = require('../../utils');

module.exports = async (service_id, customerAccountId, getDateAmount = false) => {
    const response = await postRequest("/services/proxy", {
        body: {
          service_id,
          customerAccountId,
          ...(getDateAmount ? {
            requestType: "GET_DUE_DATE_AND_AMOUNT"
          } : {})
        },
      });

    const customerAccount = await response.json();
    return customerAccount
}