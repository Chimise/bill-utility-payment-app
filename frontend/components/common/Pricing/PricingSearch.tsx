import React, { useMemo, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import cn from "classnames";

import type { PricingData } from "./Pricing";

interface PricingSearchProps {
  searchTypes: string[];
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

const PricingSearch = ({
  searchTypes,
  selected,
  onSelect,
}: PricingSearchProps) => {
  return (
    <div className="py-3">
      <div className="flex space-between items-center border-0 border-t border-slate-300 space-x-3">
        <div className="font-medium text-sm text-slate-700 tracking-wide">
          Filter
        </div>
        <div className="flex-1 flex justify-end">
          <Listbox value={selected} onChange={onSelect}>
            <div className="relative w-40 xl:w-36 py-2">
              <Listbox.Button className="flex items-center justify-center w-full py-2 pl-1 pr-4 text-left bg-transparent cursor-default focus:outline-none text-sm">
                {({ open }) => {
                  return (
                    <>
                      <span className="truncate uppercase font-medium text-sm text-slate-700 tracking-wide mr-2">
                        {selected || "All"}
                      </span>
                      <span className="flex items-center">
                        <ChevronDownIcon
                          className={cn(
                            "w-4 h-4 text-gray-400 transition-transform duraration-50",
                            { "rotate-180": open, "rotate-0": !open }
                          )}
                        />
                      </span>
                    </>
                  );
                }}
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full bg-slate-100 shadow-lg z-10 py-1 space-y-1 mt-1 rounded-sm min-h-40 text-sm focus:outline-none overflow-y-scroll">
                  <Listbox.Option
                    value=""
                    className={({ active, selected }) =>
                          `cursor-default select-none relative py-2 pl-2 pr-1 ${
                            active
                              ? "text-slate-300 bg-slate-900"
                              : "text-slate-900"
                          }`
                        }
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate text-sm text-center ${
                          selected ? "font-normal" : "font-light"
                        }`}
                      >
                        ALL
                      </span>
                    )}
                  </Listbox.Option>
                  {searchTypes.map((type, index) => {
                    return (
                      <Listbox.Option
                        key={index}
                        value={type}
                        className={({ active, selected }) =>
                          `cursor-default select-none relative py-2 pl-2 pr-1 ${
                            active
                              ? "text-slate-300 bg-slate-900"
                              : "text-slate-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <span
                            className={`block truncate uppercase text-sm text-center ${
                              selected ? "font-normal" : "font-light"
                            }`}
                          >
                            {type}
                          </span>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default PricingSearch;
