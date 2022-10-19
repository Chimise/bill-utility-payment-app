
const {postRequest, generateUniqueNumber} = require('../../utils');

module.exports = async (service_id, others = {}) => {
    const trans_id = generateUniqueNumber();
    const response = await postRequest('/services/', {
        service_id,
        trans_id,
        ...others
    })

    const responseData = await response.json();
    if(response.status === 202 || responseData.statusCode === '202'){
        responseData.processing = true;
    }
    responseData.trans_id = trans_id;

    return responseData;
}