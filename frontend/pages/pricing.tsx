import useSWR from "swr";
import { getOperators } from "../utils/requests";
import Pricing from "../components/common/Pricing/Pricing";
import { Operator } from "../utils";

interface PricingPageProps {
  operators: Array<Operator>;
}

const PricingPage = ({ operators }: PricingPageProps) => {
  return <Pricing operators={operators} />;
};

export const getStaticProps = async () => {
  const operators = getOperators();
  return {
    props: {
      operators,
    },
  };
};

export default PricingPage;
