import React from "react";
import cn from 'classnames';

import Card from "../../ui/Card/Card";
import SupportIcon from "../../icons/Support";
import SecurityIcon from "../../icons/Security";
import RocketIcon from "../../icons/Rocket";

const icons = {
  support: SupportIcon,
  security: SecurityIcon,
  rocket: RocketIcon,
};

interface MarketingCardProps {
  fullWidth?: boolean;
  title: string;
  description: string;
  className?: string;
  icon: "support" | "security" | "rocket";
}

const MarketingCard = ({
  title,
  description,
  className,
  icon,
}: MarketingCardProps) => {

    const Icon = icons[icon]

    const classes = cn("group w-full px-3 py-5 h-60 xl:h-64 flex flex-col transition-all duration-100 hover:shadow-slate-500/25 hover:bg-slate-700 select-none hover:shadow-xl justify-between", className)

  return (
    <div className="cursor-pointer md:last:col-span-2 lg:last:col-span-1">
      <Card className={classes}>
        <Icon />
        <h3 className='text-3xl text-black group-hover:text-slate-200 mb-1'>{title}</h3>
        <p className='text-sm text-gray-700 group-hover:text-white/75'>
          {description}
        </p>
      </Card>
    </div>
  );
};

export default MarketingCard;
