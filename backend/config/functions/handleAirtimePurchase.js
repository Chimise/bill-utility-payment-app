const {postRequest, generateUniqueNumber} = require('../../utils');

module.exports = async function (airtime_id, phoneNumber, amount, type) {
    const trans_id = generateUniqueNumber();
    const response = await postRequest('/services', {
        body: {
            trans_id,
            service_id: airtime_id,
            service_type: type,
            phoneNumber,
            amount
        }
    })

    const data = await response.json();
    if(response.status === 202 || data.statusCode === '202') {
        data.processing = true;
    }
    data.trans_id = trans_id;
    return data;
};