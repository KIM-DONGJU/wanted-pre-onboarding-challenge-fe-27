import { type HTMLInputAutoCompleteAttribute, type ChangeEvent } from "react";
import { Input } from "@headlessui/react";

interface CommonInputProps {
  value: string;
  onChange: (e: string) => void;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  width?: 'full' | 'auto';
  height?: 'sm' | 'md' | 'lg';
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}

export function CommonInput({
  value,
  onChange,
  className,
  type = 'text',
  width = 'full',
  height = 'md',
  name,
  placeholder,
  disabled = false,
  autoComplete,
}: CommonInputProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const widthClasses = {
    'full': 'w-full',
    'auto': 'w-auto',
  }

  const heightClasses = {
    'sm': 'h-6',
    'md': 'h-8',
    'lg': 'h-10',
  }

  return (
    <Input
      className={`${widthClasses[width]} ${heightClasses[height]} ${className} rounded p-2 border border-slate-600 focus:outline-slate-400 placeholder:text-sm`}
      type={type}
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      autoComplete={autoComplete}
    />
  )
}