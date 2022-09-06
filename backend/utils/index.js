const fetch = require('node-fetch');
const yup = require('yup');

const MOBILENIG_URI = "https://enterprise.mobilenig.com/api";

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
    const response = await fetch(`${MOBILENIG_URI}${url}`, {
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

exports.handleError = async (ctx, error) => {
    if(error instanceof yup.ValidationError) {
        return ctx.badRequest(error.errors[1]);
    }else if(error instanceof RequestError) {
        let response;
        try{
            const text = await error.response.text();
            response = JSON.parse(text);
        }catch(err) {
            response = null;
        }
        return ctx.badImplementation(error.message, response);
    }else {
        return ctx.badRequest("Something wrong happened", error.data || {});
    }
}
