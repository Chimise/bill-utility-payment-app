import React from "react";

import Container from "../../ui/Container/Container";
import MarketingCard from "./MarketingCard";


interface ContentType {
  id: number;
  title: string;
  description: string;
  icon: "support" | "security" | "rocket";
}

const contents: ContentType[] = [
  {
    id: 1,
    icon: "rocket",
    description:
      "Nccommtech offers fully automated and fast services with realtime notification feature and also bulk transaction",
    title: "Automated",
  },
  {
    id: 2,
    icon: "support",
    description:
      "Nccommtech is dedicated to making our customers happy with rapid attention. If you have any question or concern you have come to the right place",
    title: "Customer Support",
  },
  {
    id: 3,
    icon: "security",
    title: "Secured Interface",
    description:
      "Transactions on Nccommtech are 100% secure and safe, Highest level of data encryption you can never imagine. ",
  },
];

const MarketingSection = () => {
  return (
    <section className="bg-slate-100 py-12 lg:py-18 lg:px-10">
      <Container>
        <header className="px-4 py-3 lg:py-3 text-center space-y-3 md:max-w-3xl md:mx-auto w-full">
          <h2 className="text-4xl font-medium text-blue-900">Why Choose Us?</h2>
          <p className="text-gray-800 text-base lg:text-lg font-normal">
            Whether you are a casual surfer using just 1000MB a month or a heavy
            data user consuming 40GB+ monthly, we have an affordable data plan
            for you.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 gap-y-6 my-6">
            {contents.map(({id, ...properties}) => {
                return (<MarketingCard key={id} {...properties}  />)
            })}
        </div>
      </Container>
    </section>
  );
};

export default MarketingSection;
