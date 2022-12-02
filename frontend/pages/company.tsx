import { NextSeo } from "next-seo";
import Company from "../components/common/Company/Company";

const CompanyPage = () => {
  return (
    <>
      <NextSeo
        title="About Us"
        description="Get to know who we are, our services"
        nofollow
        noindex
      />
      <Company />
    </>
  );
};

export default CompanyPage;
