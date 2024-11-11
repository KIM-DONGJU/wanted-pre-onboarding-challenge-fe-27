import { Textarea } from "@headlessui/react";
import { ChangeEvent } from "react";

interface CommonTextAreaProps {
  value: string;
  onChange: (e: string) => void;
  className?: string;
  name?: string;
  width?: 'full' | 'auto';
  rows?: number;
  placeholder?: string;
}

export function CommonTextArea({
  value,
  onChange,
  className,
  name,
  width = 'full',
  rows = 3,
  placeholder,
}: CommonTextAreaProps) {
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const widthClasses = {
    'full': 'w-full',
    'auto': 'w-auto',
  }

  return (
    <Textarea
      className={`${widthClasses[width]} ${className} rounded p-2 border border-slate-600 focus:outline-slate-400 placeholder:text-sm`}
      name={name}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={handleTextAreaChange}
    />
  )
}