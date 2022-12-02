import * as Yup from "yup";
import RequestError from "./RequestError";
import type { Stepper } from "../components/common/AnalyzeNumbers/AnalyzeNumbers";

export interface Db {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Operator extends Db {
  name: string;
}


export interface Plan extends Db {
  validity: string,
  value: number,
  provider: Operator,
  selling_price: number,
  type: string
}

export type Providers = {
  [K: string]: string;
};

export const providers: Providers = {
  mtn: "bg-[#ffc000]",
  airtel: "bg-white",
  "9mobile": "bg-green-800",
  glo: "bg-green-900",
};

export type PricingData = {
  id: number;
  provider: string;
  type: string;
  price: number;
  value: string;
};

interface Disco {
  id: number;
  name: string;
  initial: string;
}

export interface Funding {
  id: number;
  walletBalance: number;
  amount: number;
  date: Date;
  comment: string;
}

interface RequestParams {
  headers?: {
    [key: string]: string
  },
  body: any,
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
}

export interface User {
  id: string;
  amount: number;
  email: string;
  phoneNo: string;
  username: string;
  firstName: string;
  lastName: string;
}


export const parseNumbersToArray = (enteredNumbers: string) => {
  const numbers = Yup.string()
    .trim()
    .transform((value: string) => value.replace(/(\s|\n|,)+/g, ","))
    .cast(enteredNumbers);
  if (numbers) {
    return numbers.split(",").filter((val) => val.trim() !== "");
  }

  return [];
};

export const filteredNumbers = (enteredNumbers: string) => {
  const parsedNumbers = parseNumbersToArray(enteredNumbers);
  return parsedNumbers.reduce(
    (acc, number) => {
      const isValid = number.match(
        new RegExp("(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)")
      );

      if (isValid) {
        // Make the numbers unique
        const similarNumberIndex = acc["validNum"].findIndex(
          (num) => num === number
        );
        if (similarNumberIndex === -1) {
          acc["validNum"] = [...acc["validNum"], number];
        }
      } else {
        acc["invalidNum"] = [...acc["invalidNum"], number];
      }
      return acc;
    },
    { invalidNum: [], validNum: [] } as {
      validNum: string[];
      invalidNum: string[];
    }
  );
};

export const convertToBytes = (dataPlan: string): number => {
  const [data, dataType] = dataPlan.split(new RegExp("(gb|mb|tb)$", "i"));
  const transformedData = parseInt(data);
  let dataInBytes: number;

  switch (dataType) {
    case "mb":
      dataInBytes = transformedData * 1024;
    case "gb":
      dataInBytes = transformedData * 1024 * 1024;
    case "tb":
      dataInBytes = transformedData * 1024 * 1024 * 1024;
    default:
      dataInBytes = 0;
  }

  return dataInBytes;
};

export const formatDate = (date: string) => {
  // const dayOfMonth = date.getDate();
  // const month = date.getMonth();
  // const year = date.getFullYear();

  // return `${dayOfMonth}/${month}/${year}`;
  return date.slice(0, 19);
}


export const getBackendUri = (path: string = '') => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
}

export async function sendRequest<Data extends object = {}>(uri: string, {body = {}, headers = {}, method = 'POST'}: RequestParams, token: string | null = '') {
  const response = await fetch(getBackendUri(uri), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? {'Authorization': `Bearer ${token}`} : {}),
      ...headers
    },
    body: JSON.stringify(body)
  });

  const responseData = await response.json();
  if(!response.ok) {
    let message = responseData.message;
    if(Array.isArray(message)) {
      message = message[0].messages[0].message;
    }
    const error = new RequestError({message: message, code: responseData.statusCode || response.status, errors: responseData.errors});
    throw error;
  };

  return responseData as Data;

}

export const fetcher = async (url: string, token?: string) => {
  const response = await fetch(getBackendUri(url), {
    headers: {
      ...(token ? {
        'Authorization': `Bearer ${token}`
      }: {})
    }
  });

  
  if(!response.ok) {
    let responseData;
    try {
      const data = await response.text();
      responseData = JSON.parse(data);
    } catch (error) {
      responseData = {message: 'An error Occured, Try Again', statusCode: response.status}
    }
    const error = new RequestError({message: responseData.message, code: responseData.statusCode || response.status, errors: responseData.errors});
    throw error;
  }

  
  return response.json();
}

export const capitalizeFirstLetter = (word: string) => {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`
}

export const convertDataToString = (data: number) => {
  if(data < 1000) {
      return `${data}MB`
  }
   const converToGigaByte = data / 1000;
   return `${converToGigaByte.toFixed(0)}GB`
}

export const getStepperAttr = (amount: number, operator: Operator | undefined, recipients: number, isValidActive: boolean, isInValidActive: boolean, validNumbers: string[], invalidNumbers: string[]): Array<Stepper> => {
  const isProviderValid = !!operator;
  const isTotalValid = recipients > 0 && amount > 0
  const total = isTotalValid ? recipients * amount : 0;

  return [{iconName: 'provider', active: isProviderValid, header: 'Provider', content: operator? operator.name : ''}, {iconName: 'validNumbers', active: isValidActive, header: 'Valid Numbers', content: validNumbers}, {iconName: 'invalidNumbers', active: isInValidActive, header: 'Invalid Numbers', content: invalidNumbers}, {iconName: 'recipients', active: isValidActive, header: 'Recipients', content: recipients.toString()}, {iconName: 'total', active: isTotalValid, header: 'Total', content: `₦${total}`}]
}
