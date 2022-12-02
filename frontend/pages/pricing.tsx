import { NextSeo } from "next-seo";
import { getOperators } from "../utils/requests";
import Pricing from "../components/common/Pricing/Pricing";
import { Operator } from "../utils";

interface PricingPageProps {
  operators: Array<Operator>;
}

const PricingPage = ({ operators }: PricingPageProps) => {
  return (
    <>
      <NextSeo
        title="Pricing"
        description="View prices of data and airtime for MTN, AIRTEL, GLO and ETISALAT"
        nofollow
        noindex
      />
      <Pricing operators={operators} />
    </>
  );
};

export const getStaticProps = async () => {
  const operators = await getOperators();
  return {
    props: {
      operators,
    },
  };
};

export default PricingPage;
