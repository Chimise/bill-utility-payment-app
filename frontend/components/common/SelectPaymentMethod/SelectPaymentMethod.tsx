import React from "react";
import { RadioGroup } from "@headlessui/react";

import Chip from '../../ui/Chip/Chip';

interface SelectPaymentMethodProps<S extends object = {}> {
  selected: S;
  onSelect: React.Dispatch<React.SetStateAction<S>>;
  channels: Array<S>;
}

export interface Payment {
  id: string | number;
  title: string;
  label?: {text: 'Top choice' | 'Recommended' | 'Zero fees' | 'Slowest', color: 'success' | 'error' | 'warning' | 'info'};
  charges: number;
  total: number;
  duration: string;
  availability?: string;
  meta?: string;
}


function SelectPaymentMethod<S extends Payment = Payment>({
  selected,
  onSelect,
  channels,
}: SelectPaymentMethodProps<S>) {
  return (
    <RadioGroup value={selected} onChange={onSelect}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-2">
        {channels.map((channel) => (
          <RadioGroup.Option
            key={channel.id}
            value={channel}
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                  : ""
              }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
            }
          >
            {({ active, checked }) => (
              <div className="w-full">
                <div className="flex items-center justify-between mb-0.5">
                  <RadioGroup.Label
                    as="p"
                    className={`font-medium  ${
                      checked ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {channel.title}
                  </RadioGroup.Label>
                  {channel.label && <Chip color={channel.label.color}>
                    {channel.label.text}
                    </Chip>}

                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <RadioGroup.Description
                      as="span"
                      className={`${
                        checked ? "text-sky-100" : "text-gray-500"
                      } font-bold text-sm`}
                    >
                      <span>Fee: &#8358;{channel.charges}</span> {"|"}{" "}
                      <span>Total: &#8358;{channel.total}</span>
                    </RadioGroup.Description>
                    <div className={`text-xs ${checked ? 'text-slate-50' : 'text-gray-800'}`}>
                      <span>{channel.duration}{" "}</span>
                      {channel.availability && <span>{"|"}{" "}{channel.availability}{" "}</span>}
                      {channel.meta && <span>{"|"}{" "}{channel.meta}</span>}
                    </div>
                  </div>
                  <div className="shrink-0 h-6 w-6 text-white flex items-center self-end">
                    {checked && <CheckIcon className="h-6 w-6" />}
                  </div>
                </div>
                
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

function CheckIcon(props: React.HTMLAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



export default SelectPaymentMethod;