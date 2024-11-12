import { Radio, RadioGroup } from "@headlessui/react";

interface Item<T> {
  value: T,
  label: string,
}

interface CommonRadioGroupProps<T> {
  className?: string,
  value: T,
  items: Item<T>[],
  onChange: (value: T) => void,
}

export function CommonRadioGroup<T = string>({
  className = "",
  value,
  items,
  onChange,
}: CommonRadioGroupProps<T>) {
  return (
    <RadioGroup value={value} onChange={onChange} className={className}>
      <div className="flex items-center gap-x-3">
        {
          items.map((item, index) => (
            <Radio
              key={index}
              value={item.value}
              className="flex-1 group cursor-pointer"
            >
              <div className="rounded text-center border border-blue-500 group-data-[checked]:bg-blue-500 group-data-[checked]:text-white">
                <span>{item.label}</span>
              </div>
            </Radio>
          ))
        }
      </div>
    </RadioGroup>
  )
}