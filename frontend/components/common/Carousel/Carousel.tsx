import React from "react";
import Slider from "react-slick";
import Container from "../../ui/Container/Container";
import CarouselCard from "./CarouselCard";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

type Review = {
  id: number;
  name: string;
  review: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Stephen",
    review:
      "Talking in terms of speed and reliability, Nccommtech is the best.",
  },
  {
    id: 2,
    name: "Olumide",
    review:
      "Nccommtech kudos for the excellent well done job, your service is super fast",
  },
  {
    id: 3,
    name: "Anthony",
    review:
      "I was thinking Nccommtech is not real earlier, but a trail conviced me. keep up the good job!",
  },
];

const Carousel = () => {
  return (
    <section className="w-full h-auto overflow-x-hidden py-12 bg-slate-100">
      <Container className="space-y-5">
        <header className="p-2 text-center text-blue-900 text-3xl font-medium">
          <h1>They Love Us</h1>
        </header>
        <Slider
          {...settings}
          className="w-[350px] sm:w-[500px] md:w-[650px] lg:w-[800px] xl:w-[900px] mx-auto shadow-md"
        >
          {reviews.map(({id, ...review}) => {
              return (<CarouselCard key={id} {...review} />) 
          })}
        </Slider>
      </Container>
    </section>
  );
};

export default Carousel;
