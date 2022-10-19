import React, {Fragment, useState, useEffect} from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import ReactDom from 'react-dom';

import Button from "../../ui/Button/Button";

interface MobileMenu {
  isVisible: boolean;
  onClick: () => void;
}

const links = [
  { href: "/", title: "Home" },
  { href: "/company", title: "Company" },
  { href: "/pricing", title: "Pricing" },
  { href: "/contact", title: "Contact" },
];

const MobileMenu = (props: MobileMenu) => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
        return () => {
            setDomLoaded(false);
        }
    }, [])


  return (
    <Transition
      show={props.isVisible}
      className='absolute w-full z-[5] h-min-[40vh] shadow-sm md:hidden'
    >
      <Transition.Child enter="transition-transform duration-200 ease-in-out"
      as={Fragment}
      enterFrom="-translate-y-full opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition-transform duration-200 ease-out"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="-translate-y-full opacity-0">
        <nav className="w-full h-full bg-slate-100 flex flex-col items-stretch divide-y divide-slate-300">
          <ul className="flex flex-col space-y-1 mb-3 flex-1">
          {links.map((link, index) => {
                return (
                  <li key={index}>
                  <Link href={link.href}>
                    <a onClick={props.onClick} className="block w-full h-full py-2 px-3 truncate text-center font-medium text-blue-900 text-normal hover:bg-blue-600 hover:text-slate-100 focus:outline-none">
                      {link.title}
                    </a>
                  </Link>

                </li>
                )
            })}
          </ul>
          <ul className="flex justify-evenly p-1 items-center space-x-1 flex-1">
            <li className="grow-[2]">
              <Link href="/auth/login">
                <a onClick={props.onClick} className="block w-full h-full py-2 px-4 truncate text-center font-medium text-blue-500 text-normal border border-transparent focus:outline-none hover:border-blue-500 rounded-md hover:bg-blue-500 hover:text-slate-100">
                  Sign In
                </a>
              </Link>
            </li>
            <li className="grow-[3]">
              <Link href="/auth/register" passHref>
                <Button Component="a" onClick={props.onClick} className="w-full h-full" variant="slim">
                  create new account
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </Transition.Child>
      
    
    {domLoaded && ReactDom.createPortal(<Transition.Child as={Fragment} enter='transition-opacity duration-100' enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 z-[1] bg-black/20 md:hidden" onClick={props.onClick}></div>
      </Transition.Child>, document.getElementById('menu') as HTMLElement)
  }

    </Transition>
  )
};

export default MobileMenu;
