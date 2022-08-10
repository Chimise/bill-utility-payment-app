import React from 'react';
import Hero from '../components/common/HeroSection/Hero';
import MarketingSection from '../components/common/MarketingSection/MarketingSection';
import ServiceSection from '../components/common/ServiceSection/ServiceSection';
import Banner from '../components/common/Banner/Banner';
import Carousel from '../components/common/Carousel/Carousel';
import Partners from '../components/common/Partners/Partners';

const HomePage = () => {
  return (
    <>
    <Hero />
    <MarketingSection />
    <ServiceSection />
    <Banner />
    <Carousel />
    <Partners />
    </>
  )
}

export default HomePage;