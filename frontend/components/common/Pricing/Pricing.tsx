import React, { useState, useMemo } from "react";
import Container from "../../ui/Container/Container";
import PricingSearch from "./PricingSearch";
import PricingCardList from "./PricingCardList";


export type PricingData = {
  id: number;
  provider: string;
  type: string;
  price: number;
  value: string;
};

export type TransformedDataInner = {
  [key: string]: Array<{id: number; price: number; value: string;}>
}

export type TransformedData = {
  [key: string]: TransformedDataInner;
};


const convertToBytes = (dataPlan: string): number => {
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

const pricingData: PricingData[] = [
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

const Pricing = () => {
  const [selected, setSelected] = useState("");

  const transformedData = useMemo<TransformedData>(
    () =>
      pricingData.reduce<TransformedData>((prev, curr) => {
        if (!prev[curr.provider]) {
          prev[curr.provider] = {
            [curr.type]: [
              { id: curr.id, value: curr.value, price: curr.price },
            ],
          };
        } else {
          prev[curr.provider][curr.type] = [...(prev[curr.provider][curr.type] || []), {id: curr.id, value: curr.value, price: curr.price}].sort((prev, next) => (convertToBytes(prev.value) - convertToBytes(next.value)));
          }

          return prev;
        }, {}),
    []
  );

  const providers = useMemo(
    () => Object.keys(transformedData),
    [transformedData]
  );

  const dataPlans = useMemo(() => transformedData[selected] ? {[selected]: transformedData[selected]} : transformedData, [selected, transformedData])

  return (
    <section className="bg-white/50 min-h-[50vh]">
      <Container>
        <header className="text-center text-4xl py-8 md:py-12 lg:text-5xl text-gray-600 font-medium">
          <h1>Our Data Pricing Plans</h1>
        </header>
        <PricingSearch
          selected={selected}
          onSelect={setSelected}
          searchTypes={providers}
        />
        <PricingCardList dataPlans={dataPlans} />
        
      </Container>
    </section>
  );
};

export default Pricing;
