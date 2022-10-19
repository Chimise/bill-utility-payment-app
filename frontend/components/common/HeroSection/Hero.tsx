import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "../../../assets/browsers.png";

const Hero = () => {
  return (
    <section className="bg-gray-100/40 w-full">
      <div className="max-w-6xl mx-auto flex flex-row flex-wrap py-3 px-5 md:p-8 gap-y-4">
        <div className="basis-full md:basis-1/2 flex-1 p-2 space-y-6">
          <h1 className="font-medium text-5xl sm:text-6xl lg:text-7xl">
            Welcome to <span className="text-blue-900">Nccommtech</span>
          </h1>
          <p className="text-medium text-gray-700">
            Nccommtech is the best, reliable and affordable way to get cheap
            data bundles on any Nigerian network. Our price rates beat that of
            network providers.
          </p>
          <Link href="/auth/register" passHref>
            <a
              className="bg-blue-500 text-white cursor-pointer inline-flex
    px-6 py-3 leading-6 transition ease-in-out duration-150
    shadow-sm text-center justify-center uppercase
    border border-transparent items-center text-sm font-semibold
    tracking-wide rounded-lg"
            >
              Get Started
            </a>
          </Link>
        </div>
        <div className="basis-full md:basis-1/2 flex-1 p-2 overflow-x-hidden">
          <Image
            src={HeroImage}
            priority
            alt="People surfing the internet with different browsers"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
