
const {postRequest} = require('../../utils');

module.exports = async (service_id, isData = false) => {
    const response = await postRequest('/services/proxy', {
        body: {
            service_id,
            requestType: isData ? "SME" : "PREMIUM"
        }
    })

    const data = await response.json();
    let status = false;
    if(data.details.available === '1' && data.details.strength === 'Excellent') {
        status = true;
    }
    return status;
}