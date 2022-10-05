
const {postRequest} = require('../../utils');

module.exports = async (service_id, type) => {
    const response = await postRequest('/services/proxy', {
        body: {
            service_id,
            requestType: type
        }
    })

    const data = await response.json();
    let status = false;
    if(data.details.available === '1' || data.details.status === 'Available') {
        status = true;
    }
    return status;
}