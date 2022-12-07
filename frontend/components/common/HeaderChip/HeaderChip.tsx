import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import ArrowUpIcon from "@heroicons/react/outline/ChevronUpIcon";

interface HeaderChipProps {
  isVisible: boolean;
}

const HeaderChip = ({ isVisible }: HeaderChipProps) => {
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Transition
      as={Fragment}
      show={isVisible}
      enter="transition-opacity duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="fixed w-8 lg:w-10 lg:h-10 p-1 bottom-4 right-4 text-white bg-slate-500 rounded-full z-10 shadow-sm flex items-center justify-center"
        onClick={clickHandler}
      >
        <ArrowUpIcon />
      </div>
    </Transition>
  );
};

export default HeaderChip;
