import React, { useState, useMemo} from "react";

import Container from "../../ui/Container/Container";
import PricingSearch from "./PricingSearch";
import PricingCardList from "./PricingCardList";
import { Operator, Plan} from "../../../utils";
import useOperators from "../../../hooks/useOperators";
import usePlans from '../../../hooks/usePlans';
import Spinner from '../../ui/Spinner/Spinner';
import Error from '../../ui/Error/Error';


interface PricingProps {
  operators: Array<Operator>
}

export type TransformedPlans = {
  [key: string]: Array<Plan>
}


const Pricing = ({operators: initialOperators}: PricingProps) => {
  const {operators} = useOperators(initialOperators);
  const [selected, setSelected] = useState(operators![0]);
  const {plans, error, isLoading, mutate} = usePlans(selected.id);

  const transformedPlans = useMemo(() => {
    if(plans) {
      return plans.reduce<TransformedPlans>((acc, prev) => {
      const plans = (acc[prev.validity] || []);
      acc[prev.validity] = [...plans, prev];
      acc[prev.validity].sort((planA, planB) => planA.value - planB.value);
      return acc;
      }, {});
    }
  }, [plans])



  return (
    <section className="bg-white/50 min-h-[50vh]">
      <Container>
        <header className="text-center text-4xl py-8 md:py-12 lg:text-5xl text-gray-600 font-medium">
          <h1>Our Data Pricing Plans</h1>
        </header>
        {operators && <PricingSearch
          selected={selected}
          onSelect={setSelected}
          operators={operators}
        />}
        {isLoading && <Spinner className="w-full p-10" />}
        {error && <Error error={error.message} onRetry={() => mutate()} className="p-9" />}
        {transformedPlans && <PricingCardList dataPlans={transformedPlans} />}
        
      </Container>
    </section>
  );
};

export default Pricing;
