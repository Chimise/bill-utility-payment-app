import React, { SVGProps } from "react";

import Container from "../../ui/Container/Container";
import ServiceCard from "./ServiceCard";
import MobileIcon from '@heroicons/react/solid/DeviceMobileIcon';
import DesktopIcon from '@heroicons/react/solid/DesktopComputerIcon';
import LightBulbIcon from '@heroicons/react/solid/LightBulbIcon';
import PhoneIcon from '@heroicons/react/solid/PhoneIcon';


interface ContentType {
  id: number;
  title: string;
  description: string;
  Icon: typeof MobileIcon
}

const contents: ContentType[] = [
  {
    id: 1,
    description:
      "Purchase data at a very discounted rate, our system delivers your Data Automatically immediately",
    title: "Data Top-Up",
    Icon: MobileIcon
  },
  {
    id: 2,
    description:
      "Nccommtech robust system allow users to pay Electricity bills ranging from (Abuja, Ikeja electricity etc)",
    title: "Electricity Discharge",
    Icon: LightBulbIcon
  },
  {
    id: 3,
    title: "Cable Tv Subscribtion",
    description: "Pay your DSTV, GOTV & STARTIME subscriptions without stress on Nccommtech",
    Icon: DesktopIcon
  },
  {
    id: 4,
    title: "Airtime Top-Up",
    description: "You can earn some commissions with your airtime purchase. Therefore, we offer an unbeatable solution",
    Icon: PhoneIcon
  }
];

const ServiceSection = () => {
  return (
    <section className="bg-gray-50/50 py-14 lg:px-10">
      <Container>
        <header className="px-4 py-3 lg:py-3 text-center md:max-w-3xl md:mx-auto w-full">
          <h2 className="text-4xl font-medium text-gray-800">Our Services</h2> 
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-y-5 gap-x-4 my-6">
            {contents.map(({id, ...properties}) => {
                return (<ServiceCard key={id} {...properties}  />)
            })}
        </div>
      </Container>
    </section>
  );
};

export default ServiceSection;
