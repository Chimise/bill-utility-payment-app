import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

interface PanelProps {
    header: string;
    content: string;
}

function Panel({header, content}: PanelProps) {
  return (

        <Disclosure as="div" className="bg-white">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between bg-cyan-700 px-4 py-3 text-left text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus-visible:ring focus-visible:ring-cyan-700 focus-visible:ring-opacity-75">
                <span>{header}</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180' : 'rotate-0'
                  } h-5 w-5 text-slate-100 duration-200 ease-linear transition-transform`}
                />
              </Disclosure.Button>
              <Transition enter="transition-all duration-100 ease-out" enterFrom="scale-95 opacity-0" enterTo="scale-100 opacity-100" leave="transition-all duration-100 ease-out" leaveFrom='scale-100 opacity-100' leaveTo='scale-95 opacity-0'>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {content}
              </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
  )
}

export default Panel;
