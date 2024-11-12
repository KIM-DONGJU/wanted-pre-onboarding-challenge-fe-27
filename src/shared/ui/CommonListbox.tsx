import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

interface Item<T> {
  value: T,
  label: string,
}

interface CommonListBoxProps<T> {
  className?: string;
  items: Item<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function CommonListBox<T = string>({
  className = "",
  items,
  value,
  onChange,
}: CommonListBoxProps<T>) {

  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className="w-full">
        <Listbox
          as="div"
          className="space-y-1"
          value={value}
          onChange={onChange}
        >
          <div className="relative">
            <ListboxButton className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150">
              <span className="block truncate">{selectedPerson}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </ListboxButton>
            <ListboxOptions
              className="mt-1 border border-gray-300 w-full absolute max-h-60 rounded-md text-base leading-6 shadow-xs overflow-auto focus:outline-none "
            >
              {items.map((item, index) => (
                <ListboxOption key={index} value={item.value}>
                  {({ selected }) => (
                    <div
                      className="flex items-center gap-x-3 text-black bg-white cursor-default select-none relative py-2 pl-8 pr-4 hover:bg-blue-400"
                    >
                      {selected && (
                        <CheckIcon className="absolute left-0 flex items-center pl-1.5 size-6"  color="blue"/>
                      )}
                      <span
                        className={`${
                          selected ? "font-semibold" : "font-normal"
                        } block truncate`}
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </div>
  );
}