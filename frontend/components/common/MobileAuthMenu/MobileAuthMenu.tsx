import React, { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

import { XIcon } from "@heroicons/react/outline";
import LogoImage from "../../../assets/White-Logo.png";
import NavLink from '../../ui/NavLink/NavLink';
import {navLinks} from '../AuthLayout/AuthLayout';

interface MobileAuthMenuProps {
  showMenu: boolean;
  onCloseMenu: () => void;
}



const MobileAuthMenu = ({showMenu, onCloseMenu}:MobileAuthMenuProps) => {
  

  return (
    <Transition show={showMenu} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={onCloseMenu}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition-transform ease-in-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative max-w-xs w-full h-full bg-slate-800 shadow-xl flex flex-col overflow-y-auto">
            <div className="px-4 flex items-center justify-between bg-slate-900/50 sticky inset-x top-0 h-14">
              <Link href="/">
                <a className="inline-flex items-center mt-1">
                  <Image
                    src={LogoImage}
                    alt="Logo Image"
                    width={160}
                    height={40}
                  />
                </a>
              </Link>
              <button
                type="button"
                className="-mr-2 w-8 h-8 p-1 rounded-md text-white" 
                onClick={onCloseMenu}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>
            <div className='flex flex-col w-full divide-y divide-slate-100/25 h-[calc(100vh-56px)] pt-2 pb-14 overflow-auto px-1'>
                {Object.keys(navLinks).map((section) => (
                    <div key={section} className='py-4 px-1 space-y-2'>
                        {navLinks[section].map(link => (
                            <NavLink key={link.icon} href={link.href} onClick={onCloseMenu} icon={link.icon}>{link.label}</NavLink>
                        ))}
                    </div>
                ))}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MobileAuthMenu;
