const fetch = require('node-fetch');
const yup = require('yup');

const MOBILENIG_URI = "https://enterprise.mobilenig.com/api";
const PAYSTACK_URI = 'https://api.paystack.co';
const GEODNATECH_ROOT_URI = 'https://geodnatechsub.com/api';

exports.MOBILENG_URI = MOBILENIG_URI;

const getUri = (url) => {
    return `${MOBILENIG_URI}${url}`;
}

exports.getUri = getUri;

class RequestError extends Error {
    constructor(response, ...args) {
        super(`HTTP Error Response: ${response.status} ${response.statusText}`, args);
        this.response = response;
    }

}

exports.RequestError = RequestError;

exports.getRequest = async (url, headers = {}) => {
    const response = await fetch(getUri(url), { 
        headers: {
            Authorization: `Bearer ${process.env.MOBILENIG_KEY}`,
            
            ...headers
        },
        redirect: 'follow'
    })


    if(!response.ok) {
        throw new RequestError(response)
    }

    return response;
}

exports.getPaystackRequest = async (url, headers = {}) => {
    const response = await fetch(`${PAYSTACK_URI}${url}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
            ...headers
        }
    })

    if(!response.ok) {
        throw new RequestError(response)
    }

    return response;
}

exports.getBill = async (url, headers = {}) => {
    const response = await fetch(`${GEODNATECH_ROOT_URI}${url}`, {
        headers: {
            Authorization: `Token ${process.env.GEODNATECH_KEY}`,
            ...headers
        }
    })

    if(!response.ok) {
        throw new RequestError(response)
    }

    return response;
}



exports.postRequest = async (url, {headers = {}, body = {}}= {}) => {
    const response = await fetch(getUri(url), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.MOBILENIG_KEY}`,
            'Content-Type': 'application/json',
            ...headers
        },
        redirect: 'follow',
        body: JSON.stringify(body)
    })

    if(!response.ok) {
        throw new RequestError(response)
    }
    return response;
}

exports.postPaystackRequest = async (url, {headers = {}, body = {}}= {}) => {
    const response = await fetch(`${PAYSTACK_URI}${url}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    })

    if(!response.ok) {
        throw new RequestError(response)
    }
    return response;
}

exports.postBill = async (url, {headers = {}, body = {}}= {}) => {
    const response = await fetch(`${GEODNATECH_ROOT_URI}${url}`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${process.env.GEODNATECH_KEY}`,
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    })

    if(!response.ok) {
        throw new RequestError(response)
    }
    return response;
}

exports.handleError = async (ctx, error) => {
    if(error instanceof yup.ValidationError) {
        return ctx.badRequest(error.errors[0], {
            errors: error.errors
        });
    }else if(error instanceof RequestError) {
        let response;
        try{
            const text = await error.response.text();
            response = JSON.parse(text);
        }catch(err) {
            response = null;
        }
        return ctx.badImplementation("Something went wrong, please try again", response);
    }else {
        return ctx.badRequest("Something wrong happened", error.data || {});
    }
}

exports.generateUniqueNumber = () => {
    const randomNumber = Math.random() * 10000;
    const uniqueString = `${Math.floor(randomNumber)}${Date.now()}`;
    const shortenStringLength = uniqueString.length <= 15 ? uniqueString : uniqueString.slice(0, 15);
    return parseInt(shortenStringLength);
};

