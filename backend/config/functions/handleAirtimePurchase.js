const {postRequest, generateUniqueNumber} = require('../../utils');

module.exports = async function (service_id, phoneNumber, amount) {
    const trans_id = generateUniqueNumber();
    const response = await postRequest('/services', {
        body: {
            trans_id,
            service_id,
            service_type: 'PREMIUM',
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
}