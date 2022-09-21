import * as Yup from "yup";
import RequestError from "./RequestError";

export type Provider = "mtn" | "airtel" | "9mobile" | "glo";

export type Providers = {
  [K in Provider]: string;
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




interface OrderHistory {
  id: number;
  type: 'Data' | 'Airtime';
  recipients: number;
  provider: Provider;
  plan?: string;
  amount: number;
  date: Date;
  total?: number
}

type BillHistory =  {
  id: number;
  cardNo: number;
  amount: number;
  date: Date;
} & ({
  cableTvPackage: '1 month' | '2 months' | '3 months'| '';
  cableTvType: 'Startime' | 'Gotv' | 'Dstv'| '';
  billType: 'CableTv';
} | {
  disco: string;
  meterType: 'Prepaid' | 'Postpaid' | '';
  billType: 'Electricity';
})

interface RequestParams {
  headers?: {
    [key: string]: string
  },
  body: any,
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
}



const bills: Array<BillHistory> = [{id: 1, cardNo: 3000300892, amount: 3000, billType: 'CableTv', cableTvPackage: '1 month', cableTvType: 'Dstv', date: new Date("2001-06-11T15:20:22.887Z")}, {id: 2, cardNo: 12239939393939, amount: 2000, date: new Date("2022-06-12T16:21:22.887Z"), disco: 'EEDC', meterType: 'Prepaid', billType: 'Electricity'}, {id: 3, cardNo: 22220303939303, amount: 1500, date: new Date("2022-08-16T17:44:59.8867Z"), billType: 'CableTv', cableTvPackage: '1 month', cableTvType: 'Startime'}, {id: 4, cardNo: 200239393848449, amount: 3500, date: new Date("2022-09-16T18:44:59.8867Z"), billType: 'Electricity', meterType: 'Prepaid', disco: 'Ikedc'}, {id: 5, cardNo: 300030089223, amount: 2000, billType: 'CableTv', cableTvPackage: '2 months', cableTvType: 'Gotv', date: new Date("2022-12-22T15:20:22.887Z")}, {id: 6, cardNo: 60939300892949, amount: 1500, billType: 'CableTv', cableTvPackage: '2 months', cableTvType: 'Startime', date: new Date("2022-07-11T15:20:22.887Z")}, {id: 7, cardNo: 959953389930030, amount: 800, billType: 'CableTv', cableTvPackage: '3 months', cableTvType: 'Dstv', date: new Date("2021-09-09T15:20:22.887Z")}, {id: 8, cardNo: 3993939393947573, amount: 2000, date: new Date("2022-07-12T17:21:22.887Z"), disco: 'KEDC', meterType: 'Prepaid', billType: 'Electricity'}, {id: 9, cardNo: 93000071133939, amount: 700, date: new Date("2022-10-19T13:21:22.887Z"), disco: 'EEDC', meterType: 'Postpaid', billType: 'Electricity'}, {id: 10, cardNo: 3939393923457, amount: 900, date: new Date("2022-10-02T09:21:22.887Z"), disco: 'IKEDC', meterType: 'Prepaid', billType: 'Electricity'}]
export const sampleBills = bills.map((bill) => {
  return {
    ...bill,
    ...(bill.billType === 'CableTv' ? {
      disco: '',
      meterType: '',
    }: {}),
    ...(bill.billType === 'Electricity' ? {
      cableTvPackage: '',
      cableTvType: ''
    }: {})
  }
});

export type Bill = typeof sampleBills[number];

const sampleOrders: OrderHistory[] = [{id: 1, type: 'Airtime', recipients: 2, provider: 'mtn', amount: 100, date: new Date("2001-06-11T15:20:22.887Z")}, {id: 2, type: 'Data', plan: '1GB', recipients: 2, provider: 'airtel', amount: 1000, date: new Date("2022-06-12T16:21:22.887Z")}, {id: 3, type: 'Airtime', recipients: 4, provider: '9mobile', amount: 300, date: new Date("2022-08-16T17:44:59.8867Z")}, {id: 4, type: 'Data', plan: '3GB', recipients: 6, provider: 'mtn', amount: 300, date: new Date("2022-08-15T15:22:50.887Z")}, {id: 4, type: 'Airtime', recipients: 8, provider: 'glo', amount: 500, date: new Date("2001-06-11T15:20:22.887Z")}, {id: 5, type: 'Airtime', recipients: 1, provider: 'mtn', amount: 100, date: new Date("2022-09-22T17:40:43.887Z")}, {id: 6, type: 'Data', plan: '5GB', recipients: 6, provider: 'mtn', amount: 1000, date: new Date("2022-09-01T15:20:22.887Z")}, {id: 7, type: 'Airtime', recipients: 2, provider: 'mtn', amount: 3000, date: new Date("2022-09-14T15:30:28.887Z")}, {id: 8, type: 'Data', plan: '2.5GB', recipients: 4, provider: 'glo', amount: 1000, date: new Date("2022-12-25T19:20:22.887Z")}];
export const orders = sampleOrders.map((sampleOrder) => {
  return {
    ...sampleOrder,
    total: sampleOrder.amount * sampleOrder.recipients,
    plan: sampleOrder.plan ? sampleOrder.plan : '',
  }
});

export type Order = Required<OrderHistory>;



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

export const formatDate = (date: Date) => {
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${dayOfMonth}/${month}/${year}`;
}

export const pricingData: PricingData[] = [
  { id: 1, provider: "airtel", type: "daily", price: 100, value: "150MB" },
  { id: 2, type: "monthly", price: 105, value: "250MB", provider: "mtn" },
  { id: 3, provider: "mtn", type: "monthly", value: "500MB", price: 125 },
  { id: 4, provider: "mtn", type: "monthly", value: "1GB", price: 235 },
  { id: 5, provider: "mtn", value: "2GB", type: "monthly", price: 480 },
  { id: 6, provider: "mtn", type: "monthly", value: "3GB", price: 735 },
  { id: 7, provider: "mtn", type: "monthly", value: "5GB", price: 1250 },
  { id: 8, provider: "mtn", type: "monthly", value: "10GB", price: 2400 },
  { id: 9, provider: "mtn", type: "monthly", value: "15GB", price: 3525 },
  { id: 10, provider: "mtn", type: "monthly", value: "20GB", price: 4700 },
  { id: 11, provider: "mtn", type: "monthly", value: "40GB", price: 9400 },
  { id: 12, provider: "glo", type: "14 days", value: "1.35GB", price: 450 },
  { id: 13, provider: "glo", type: "monthly", value: "2.9GB", price: 900 },
  { id: 14, provider: "glo", type: "monthly", value: "4.1GB", price: 1350 },
  { id: 15, provider: "glo", type: "weekly", value: "1500MB", price: 1350 },
  { id: 16, provider: "glo", type: "monthly", value: "5.2GB", price: 1800 },
  { id: 17, provider: "glo", type: "monthly", value: "7.7GB", price: 2250 },
  { id: 18, provider: "glo", type: "night", value: "250MB", price: 30 },
  { id: 19, provider: "glo", type: "night", value: "500MB", price: 50 },
  { id: 20, provider: "airtel", type: "night", value: "500MB", price: 300 },
  { id: 21, provider: "airtel", type: "weekly", value: "500MB", price: 300 },
  { id: 22, provider: "airtel", type: "weekly", value: "1GB", price: 600 },
  { id: 23, provider: "airtel", type: "monthly", value: "2GB", price: 1000 },
  { id: 24, provider: "airtel", type: "monthly", value: "5GB", price: 2200 },
  { id: 25, provider: "9mobile", type: "weekly", value: "500MB", price: 190 },
  { id: 26, provider: "9mobile", type: "weekly", value: "1GB", price: 475 },
  { id: 27, provider: "9mobile", type: "monthly", value: "1GB", price: 475 },
  { id: 28, provider: "9mobile", type: "monthly", value: "1.5GB", price: 950 },
  { id: 32, provider: "9mobile", type: "monthly", value: "2GB", price: 1140 },
  { id: 29, provider: "9mobile", type: "monthly", value: "3GB", price: 1425 },
  { id: 30, provider: "9mobile", type: "monthly", value: "4.5GB", price: 1900 },
  { id: 31, provider: "9mobile", type: "weekly", value: "7GB", price: 1425 },
];

export const distributionCompanies: Disco[] = [
  { id: 1, name: "Abuja Electricity Distribution Plc", initial: "AEDC" },
  { id: 2, name: "Benin Electricity Distribution Plc", initial: "BEDC" },
  { id: 3, name: "Eko Electricity Distribution Plc", initial: "EKEDC" },
  { id: 4, name: "Enugu Electricity Distribution Plc", initial: "EEDC" },
  { id: 5, name: "Ibadan Electricity Distribution Plc", initial: "IBEDC" },
  { id: 6, name: "Ikeja Electricity Distribution Plc", initial: "IKEDC" },
  { id: 7, name: "Jos Electricity Distribution Plc", initial: "JEDC" },
  { id: 8, name: "Kaduna Electricity Distribution Plc", initial: "KAEDCO" },
  { id: 9, name: "Kano Electricity Distribution Plc", initial: "KEDC" },
  {
    id: 10,
    name: "Port Harcourt Electricity Distribution Plc",
    initial: "PHEDC",
  },
  { id: 11, name: "Yola Electricity Distribution Plc", initial: "YEDC" },
];


export const tableData: Funding[] = [
  {
    id: 1,
    walletBalance: 3000,
    amount: 1000,
    date: new Date("2000-12-10T15:20:22.678Z"),
    comment: "It was actually sucessful",
  },
  {
    id: 2,
    walletBalance: 1500,
    amount: 500,
    date: new Date("2000-10-11T09:22:42.999Z"),
    comment: "Succesful",
  },
  {
    id: 3,
    walletBalance: 300,
    amount: 200,
    date: new Date("2001-06-11T15:20:22.887Z"),
    comment: "",
  },
  {
    id: 4,
    walletBalance: 1500,
    amount: 500,
    date: new Date("2002-07-12T15:20:22.789Z"),
    comment: "Succesfull",
  },
  {
    id: 5,
    walletBalance: 2000,
    amount: 1000,
    date: new Date("2002-08-13T15:20:22.789Z"),
    comment: "",
  },
  {
    id: 6,
    walletBalance: 5500,
    amount: 2000,
    date: new Date("2003-09-14T15:20:22.789Z"),
    comment: "",
  },
  {
    id: 7,
    walletBalance: 8500,
    amount: 5000,
    date: new Date("2003-10-15T15:20:22.789Z"),
    comment: "Ok",
  },
  {
    id: 8,
    walletBalance: 6500,
    amount: 500,
    date: new Date("2004-11-16T15:20:22.789Z"),
    comment: "Nice",
  },
  {
    id: 9,
    walletBalance: 1500,
    amount: 800,
    date: new Date("2004-12-17T15:20:22.789Z"),
    comment: "",
  },
  {
    id: 10,
    walletBalance: 2500,
    amount: 500,
    date: new Date("2005-01-01T15:20:22.789Z"),
    comment: "",
  },
  {
    id: 11,
    walletBalance: 900,
    amount: 500,
    date: new Date("2005-02-19T15:20:22.789Z"),
    comment: "",
  },
  {
    id: 12,
    walletBalance: 4000,
    amount: 3000,
    date: new Date("2006-03-20T15:20:22.789Z"),
    comment: "Unbelievable",
  },
  {
    id: 13,
    walletBalance: 3000,
    amount: 2500,
    date: new Date("2006-04-20T16:20:22.789Z"),
    comment: "",
  },
  {
    id: 14,
    walletBalance: 1800,
    amount: 1000,
    date: new Date("2007-05-21T15:20:22.789Z"),
    comment: "",
  },
  {
    id: 15,
    walletBalance: 1900,
    amount: 500,
    date: new Date("2007-06-22T15:20:22.789Z"),
    comment: "",
  },
  {
    id: 16,
    walletBalance: 2000,
    amount: 1800,
    date: new Date("2008-07-23T15:20:22.789Z"),
    comment: "",
  },
  {
    id: 17,
    walletBalance: 1700,
    amount: 200,
    date: new Date("2008-08-24T16:20:22.789Z"),
    comment: "",
  },
  {
    id: 18,
    walletBalance: 1900,
    amount: 1200,
    date: new Date("2009-09-25T17:20:22.789Z"),
    comment: "",
  },
  {
    id: 10,
    walletBalance: 1300,
    amount: 1100,
    date: new Date("2009-10-10T15:20:22.789Z"),
    comment: "",
  },
  {
    id: 20,
    walletBalance: 1500,
    amount: 1400,
    date: new Date("2010-10-13T15:20:22.789Z"),
    comment: "",
  },
];



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
    const error = new RequestError({message: responseData.message, code: responseData.statusCode || response.status, errors: responseData.errors});
    throw error;
  };

  return responseData as Data;

}