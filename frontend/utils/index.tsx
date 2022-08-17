import * as Yup from 'yup';


export type Provider = 'mtn' | 'airtel' | '9mobile' | 'glo';

export type Providers =  {
  [K in Provider]: string;
}

export const providers: Providers = {
    mtn: 'bg-[#ffc000]',
    airtel: 'bg-white',
    '9mobile': 'bg-green-800',
    glo: 'bg-green-900'
}

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

export const parseNumbersToArray = (enteredNumbers: string) => {
    const numbers = Yup.string().trim().transform((value: string) => value.replace(/(\s|\n|,)+/g, ',')).cast(enteredNumbers);
    if(numbers) {
        return numbers.split(',').filter(val => val.trim() !== '');
    }

    return [];

}

export const filteredNumbers = (enteredNumbers: string) => {
    const parsedNumbers = parseNumbersToArray(enteredNumbers);
    return parsedNumbers.reduce((acc, number) => {
        const isValid = number.match(new RegExp('(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)'));

        if(isValid) {
            // Make the numbers unique
            const similarNumberIndex = acc['validNum'].findIndex(num => num === number);
            if(similarNumberIndex === -1) {
                acc['validNum'] = [...acc['validNum'], number];
            }

        }else {
            acc['invalidNum'] = [...acc['invalidNum'], number]
            
        }
        return acc;
    }, {invalidNum: [], validNum: []} as {validNum: string[], invalidNum: string[]})
    
}

export const convertToBytes = (dataPlan: string): number => {
    const [data, dataType] = dataPlan.split(new RegExp('(gb|mb|tb)$', 'i'));
    const transformedData = parseInt(data);
    let dataInBytes: number;
  
    switch (dataType) {
      case 'mb':
        dataInBytes = transformedData * 1024;
      case 'gb':
        dataInBytes =  transformedData * 1024 * 1024;
      case "tb":
        dataInBytes = transformedData * 1024 * 1024 * 1024;
      default:
        dataInBytes = 0;
  
    }
  
    return dataInBytes;
    
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

  export const distributionCompanies: Disco[] = [{id: 1, name: "Abuja Electricity Distribution Plc", initial: "AEDC"}, {id: 2, name: "Benin Electricity Distribution Plc", initial: "BEDC"}, {id: 3, name: "Eko Electricity Distribution Plc", initial: "EKEDC"}, {id: 4, name: "Enugu Electricity Distribution Plc", initial: "EEDC"}, {id: 5, name: "Ibadan Electricity Distribution Plc", initial: "IBEDC"}, {id: 6, name: "Ikeja Electricity Distribution Plc", initial: "IKEDC"}, {id: 7, name: "Jos Electricity Distribution Plc", initial: "JEDC"}, {id: 8, name: "Kaduna Electricity Distribution Plc", initial: "KAEDCO"}, {id: 9, name: "Kano Electricity Distribution Plc", initial: "KEDC"}, {id: 10, name: "Port Harcourt Electricity Distribution Plc", initial: "PHEDC"}, {id: 11, name: "Yola Electricity Distribution Plc", initial: "YEDC"}];