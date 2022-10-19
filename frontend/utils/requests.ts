import { Operator, getBackendUri } from ".";
import RequestError from "./RequestError";

export const getOperators = async () => {
    const response = await fetch(getBackendUri('/providers'));
    if(!response.ok) {
        const error = new RequestError({message: "An error occured", code: response.status});
        throw error;
    }
    const data = await response.json() as Array<Operator>;
    return data;
}

export const getPaymentMethods = async () => {
    const response = await fetch(getBackendUri('/paymentmethods'));
    if(!response.ok) {
        const error = new RequestError({message: "An error occured", code: response.status});
        throw error;
    }
    const data = await response.json();
    return data;
};

export const getDiscos = async () => {
    const response = await fetch(getBackendUri('/discos'));
    if(!response.ok) {
        const error = new RequestError({message: "An error occured", code: response.status});
        throw error;
    }
    const data = await response.json();
    return data;
};

export const getCableTvs = async () => {
    const response =  await fetch(getBackendUri('/cabletvs'));
    if(!response.ok) {
        const error = new RequestError({message: "An error occured", code: response.status});
        throw error;
    }
    const data = await response.json();
    return data;
}
