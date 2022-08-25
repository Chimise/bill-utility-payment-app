import React from "react";
import cn from "classnames";
import { Transition } from "@headlessui/react";
import Stepper from "../../ui/Stepper/Stepper";
import Paper from "../../ui/Paper/Paper";
import {
  GlobeIcon,
  PhoneIcon,
  XIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";



interface AnalyzeNumbersProps {
  classNames?: string;
  label: string;
  steppers: Array<Stepper>;
}

export interface Stepper {
  header: string;
  content: string | string[];
  iconName: keyof typeof icons;
  active: boolean;
}

const icons = {
  provider: GlobeIcon,
  validNumbers: PhoneIcon,
  invalidNumbers: XIcon,
  recipients: UserGroupIcon,
  total: ShoppingCartIcon,
};

const AnalyzeNumbers = ({
  classNames,
  label,
  steppers,
}: AnalyzeNumbersProps) => {
  return (
    <Paper className={cn("my-4 p-4 space-y-4", classNames)}>
      <h6 className="text-neutral-900 font-semibold text-normal">{label}</h6>
      <div>
        {steppers.map((stepper) => {
          if (stepper.iconName === "invalidNumbers") {
            return (
                <Transition key={stepper.iconName} as={React.Fragment} show={stepper.active} enter="ease-in transition-opacity" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out transition-opacity" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Stepper
                  Icon={icons[stepper.iconName]}
                  active={stepper.active}
                  activeClass='bg-red-900'
                >
                  <span>{stepper.header}:{" "}</span>
                  <strong className="text-black uppercase font-semibold">
                    {Array.isArray(stepper.content) ? stepper.content.join(', ') : stepper.content}
                  </strong>
                </Stepper>
                </Transition>
            );
          }

          return (
            <Stepper
              key={stepper.iconName}
              Icon={icons[stepper.iconName]}
              active={stepper.active}
            >
              <span>{stepper.header}:{" "}</span>
                  <strong className="text-black uppercase font-semibold">
                    {Array.isArray(stepper.content) ? stepper.content.join(', ') : stepper.content}
                  </strong>
            </Stepper>
          );
        })}
      </div>
    </Paper>
  );
};

export default AnalyzeNumbers;
