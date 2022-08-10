import React from "react";
import cn from "classnames";

import Card from "../../ui/Card/Card";


interface ServiceCardProps {
  title: string;
  description: string;
  className?: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const ServiceCard = ({
  title,
  description,
  className,
  Icon,
}: ServiceCardProps) => {
  ;

  const classes = cn(
    "group py-3 px-6 h-52 md:h-48 lg:h-44 space-x-5 flex flex-row transition-all duration-100 select-none items-center justify-center hover:shadow-lg", className);

  return (
    <div className="cursor-pointer">
      <Card className={classes}>
        <div className='shrink-0 flex items-center'>
          <div className="w-24 h-24 rounded-full group-hover:bg-slate-400 inline-flex items-center justify-center p-3">
          <Icon className='fill-blue-700 group-hover:fill-blue-900' />
          </div>
        </div>
        <div className='flex-1 space-y-2'>
          <h3 className="text-xl text-black uppercase">
            {title}
          </h3>
          <p className="text-sm text-gray-900">
            {description}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ServiceCard;
