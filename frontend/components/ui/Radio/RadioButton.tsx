import React from "react";
import cn from "classnames";
import { RadioGroup } from "@headlessui/react";
import MobileLogo from '../../../assets/9mobile.png';
import AirtelLogo from '../../../assets/airtel.png';
import MtnLogo from '../../../assets/mtn.jpg';
import GloLogo from '../../../assets/glo.png';

interface RadioProps {
  checked: boolean;
  className?: string;
}

export type Provider = 'mtn' | 'airtel' | '9mobile' | 'glo';

export type Providers =  {
  [K in Provider]: string;
}


interface RadioButtonProps {
    selected: string;
    onSelect: React.Dispatch<React.SetStateAction<string>>;
    providers: Providers;
    label: string;
}

type ProviderImages = {
  [K in Provider]: StaticImageData;
}

const providerImages: ProviderImages  = {
  mtn: MtnLogo,
  airtel: AirtelLogo,
  '9mobile': MobileLogo,
  glo: GloLogo
}

const Radio = ({ checked, className }: RadioProps) => {
  return (
    <div
      className={cn(
        "w-[18px] h-[18px] rounded-full flex justify-center items-center transition-all border-2",
        { "border-slate-900": checked, "border-gray-700": !checked },
        className
      )}
    >
      <div
        className={cn("rounded-full bg-slate-900 transition-all", {
          "w-2 h-2": checked,
          "w-0 h-0": !checked,
        })}
      />
    </div>
  );
};





function RadioButton({ selected, onSelect, providers, label }: RadioButtonProps) {
  return (
    <RadioGroup value={selected} onChange={onSelect}>
      <RadioGroup.Label className="text-sm font-medium text-gray-700">
        {label}
      </RadioGroup.Label>
      <div className="space-x-2 flex items-center justify-around mt-2 py-7 px-2 md:px-3 bg-slate-500/20">
        {Object.keys(providers).map((provider) => (
          <RadioGroup.Option
            key={provider}
            value={provider}
            style={{backgroundImage: `url(${providerImages[provider as Provider].src})`}}
            className={({ active, checked }) => cn({'ring ring-white/60': active, [`grayscale-0 ${providers[provider as Provider]}`]: checked, 'grayscale bg-gray-400': !checked}, `relative bg-cover bg-no-repeat bg-center cursor-pointer rounded-sm shadow-sm p-2 w-16 h-16 focus:outline-none`)}
          >
            {({ checked }) => (
               <Radio checked={checked} className='absolute top-1 left-1' />
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export default RadioButton;
