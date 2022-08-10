import React from 'react';
import AvatarIcon from "../../icons/Avatar";

interface CarouselCardProps {
    name: string;
    review: string;
}


const CarouselCard = ({name, review}: CarouselCardProps) => {
    return (
    <div className="bg-white p-3 text-center w-full h-52 space-y-3 md:space-y-5">
    <div className="w-20 h-20 rounded-full mx-auto">
      <AvatarIcon />
    </div>
    <figure>
      <blockquote className="text-gray-600 mb-1 md:mb-3">
        {review}
      </blockquote>
      <figcaption>
        <cite>{name}</cite>
      </figcaption>
    </figure>
  </div>)
}

export default CarouselCard;