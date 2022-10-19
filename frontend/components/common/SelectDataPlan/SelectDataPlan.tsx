import React from 'react';
import {RadioGroup} from '@headlessui/react';

import cn from 'classnames';


import {Plan, convertDataToString} from '../../../utils';



interface SelectDataPlanProps {
    onSelect: React.Dispatch<React.SetStateAction<Plan | null>>;
    selected: Plan | null;
    label: string;
    dataPlans: Array<Plan>
}

function SelectDataPlan({ selected, onSelect, dataPlans, label }: SelectDataPlanProps) {
    return (
      <RadioGroup as='div' value={selected} onChange={onSelect}>
        <RadioGroup.Label className="text-sm font-medium text-gray-700">
          {label}
        </RadioGroup.Label>
        <div className="flex flex-wrap -mx-3 px-2 min-h-[20rem]">
          {dataPlans.map((plan) => (
            <RadioGroup.Option
              key={plan.id}
              value={plan}
              className="w-1/2 sm:w-1/3 lg:w-1/4 p-3 focus:outline-none"
            >
              {({ checked}) => (
                 <div className={cn({"after:block shadow-xl after:shadow-xl": checked, "after:hidden after:shadow-sm shadow-sm": !checked, },"after:absolute after:bottom-0 after:z-10 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2 after:bg-white after:w-5 after:h-5 after:-rotate-45 w-full h-24 md:h-[6.5rem] lg:h-28 relative cursor-pointer rounded-md")}>
                    <div className={cn({"bg-gray-600": checked, "bg-gray-500": !checked}, 'rounded-b-[150px_15px] w-full h-1/2 text-white flex items-center justify-center')}> 
                      <span className='text-sm font-semibold'>{convertDataToString(plan.value)}</span>
                    </div>
                    <div className='h-1/2 px-2 flex justify-between items-center'>
                      <p className='text-xs font-light text-slate-800'>{plan.type.toUpperCase()}</p>
                      <p className='font-semibold text-base text-gray-900'>₦{plan.selling_price}</p>
                    </div>
                 </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    );
  }



export default SelectDataPlan;