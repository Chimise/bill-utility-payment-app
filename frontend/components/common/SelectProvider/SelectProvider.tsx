import React from 'react';
import { RadioGroup } from "@headlessui/react";
import cn from "classnames";
import type {Operator} from '../../../utils'
import RadioButton from '../../ui/RadioButton/RadioButton';

import MobileLogo from '../../../assets/9mobile.png';
import AirtelLogo from '../../../assets/airtel.png';
import MtnLogo from '../../../assets/mtn.jpg';
import GloLogo from '../../../assets/glo.png';

interface SelectProviderProps {
    selected: Operator | undefined;
    onSelect: React.Dispatch<React.SetStateAction<Operator | undefined>>
    providers: Array<Operator>;
    label: string;
}

type ProviderImages = {
    [key: string]: StaticImageData;
  }
  
const providerImages: ProviderImages  = {
    mtn: MtnLogo,
    airtel: AirtelLogo,
    '9mobile': MobileLogo,
    glo: GloLogo
}

export const classes: {[key: string]: string} = {
  mtn: "bg-[#ffc000]",
  airtel: "bg-white",
  "9mobile": "bg-green-800",
  glo: "bg-green-900",
};


function SelectProvider({ selected, onSelect, providers, label }: SelectProviderProps) {
    return (
      <RadioGroup value={selected} onChange={onSelect}>
        <RadioGroup.Label className="text-sm font-medium text-gray-700">
          {label}
        </RadioGroup.Label>
        <div className="space-x-2 flex items-center justify-around mt-2 py-5 px-2 md:px-3 bg-slate-500/20">
          {providers.map((provider) => (
            <RadioGroup.Option
              key={provider.id}
              value={provider}
              style={{backgroundImage: `url(${providerImages[provider.name.toLowerCase()].src})`}}
              className={({ active, checked }) => cn({'ring ring-white/60': active, [`grayscale-0 ${classes[provider.name.toLowerCase()]}`]: checked, 'grayscale bg-gray-400': !checked}, `relative bg-cover bg-no-repeat bg-center cursor-pointer rounded-sm shadow-sm p-2 w-16 h-16 focus:outline-none`)}
            >
              {({ checked }) => (
                 <RadioButton checked={checked} className='absolute top-1 left-1' />
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    );
  }
  
  export default SelectProvider;
  