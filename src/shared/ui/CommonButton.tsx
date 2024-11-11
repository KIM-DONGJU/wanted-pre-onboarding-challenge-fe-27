import { Button } from "@headlessui/react";
import { type MouseEvent } from "react";

interface CommonButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  width?: 'full' | 'auto';
  height?: 'sm' | 'md' | 'lg';
  variant?: 'danger' | 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function CommonButton({
  children,
  onClick = () => {},
  type = 'button',
  width = 'auto',
  height = 'md',
  variant = 'primary',
  disabled = false,
  className,
}: CommonButtonProps ) {
  const variantClasses = {
    'primary': `bg-blue-600 text-white hover:bg-blue-500 ${disabled && 'cursor-not-allowed bg-opacity-50 hover:bg-opacity-50'}`,
    'secondary': `border border-slate-600 hover:bg-slate-600 hover:text-white ${disabled && 'cursor-not-allowed bg-slate-600 bg-opacity-50 hover:bg-opacity-50'}`,
    'danger': `bg-red-600 text-white hover:bg-red-500 ${disabled && 'cursor-not-allowed bg-opacity-50 hover:bg-opacity-50'}`,
  }

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
    <Button
      className={`${widthClasses[width]} ${heightClasses[height]} ${variantClasses[variant]} ${className} rounded p-2 flex items-center justify-center disabled:bg-red`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      { children }
    </Button>
  )
}