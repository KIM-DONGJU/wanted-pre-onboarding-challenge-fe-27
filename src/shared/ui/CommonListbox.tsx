import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Item<T> {
  value: T,
  label: string,
}

interface CommonListBoxProps<T> {
  className?: string;
  items: Item<T>[];
  value: T;
  defaultLabel: string;
  onChange: (value: T) => void;
}

export function CommonListBox<T = string>({
  className = "",
  items,
  value,
  defaultLabel,
  onChange,
}: CommonListBoxProps<T>) {
  const selectedItem = items.find(item => item.value === value);

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
              <span className="block truncate">{selectedItem?.label || defaultLabel}</span>
              <ChevronUpDownIcon className="size-8 absolute h-full top-0 right-0 flex items-center pointer-events-none" color="gray" />
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