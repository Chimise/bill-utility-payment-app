import React, { useState, useMemo } from "react";
import Container from "../../ui/Container/Container";
import PricingSearch from "./PricingSearch";
import PricingCardList from "./PricingCardList";
import { pricingData, convertToBytes } from "../../../utils";

export type TransformedDataInner = {
  [key: string]: Array<{id: number; price: number; value: string;}>
}

export type TransformedData = {
  [key: string]: TransformedDataInner;
};




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
