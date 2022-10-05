import React, { Fragment } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import useAuth from "../../../hooks/useAuth";
import cn from "classnames";

import MenuLink from "./MenuLink";

interface AuthHeaderProps {
  onOpenMenu: () => void;
  isHome?: boolean;
}

const AuthHeader = ({onOpenMenu, isHome}: AuthHeaderProps) => {
  const authcontext = useAuth();
  return (
    <header className={cn("w-full bg-white px-6 lg:px-8 py-2 h-14 z-10 sticky top-0 flex items-center justify-between lg:justify-end", {'shadow-sm shadow-black/50': !isHome} )}>
      <div className="shrink-0 text-slate-800 lg:hidden">
        <button className="focus:outline-none" onClick={onOpenMenu}><MenuIcon className="w-7 h-7" /></button>
      </div>
      <div>
        <Menu as="div" className="relative inline-block">
          <div className="mt-1.5">
            <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              <UserCircleIcon className="h-7 w-7" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <MenuLink
                      href="/dashboard/profile"
                      className={cn("block px-4 py-2 text-sm text-gray-500", {
                        "bg-gray-100": active,
                      })}
                    >
                      Profile
                    </MenuLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                    onClick={authcontext.logoutHandler}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm text-gray-500",
                        { "bg-gray-100": active }
                      )}
                    >
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default AuthHeader;
