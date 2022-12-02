import { Fragment } from "react";
import { NextSeo } from "next-seo";
import ContactUs from "../components/common/ContactUs/ContactUs";
import Actions from "../components/common/Actions/Actions";

const ContactPage = () => {
  return (
    <Fragment>
      <NextSeo
        title="Contact Us"
        description="To reach us or no more about our services, you can contact us by filling the form"
        nofollow
        noindex
      />
      <ContactUs />
      <Actions />
    </Fragment>
  );
};

export default ContactPage;
