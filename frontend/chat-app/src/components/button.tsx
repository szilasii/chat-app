import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

export function Button({ children, className = "", variant = "default", ...props }: ButtonProps) {
  let variantClass = "";

  if (variant === "destructive") {
    variantClass = `bg-red-500 hover:bg-red-600 text-white bg-blue`;
  } else {
    variantClass = `bg-blue-600 hover:bg-blue-700 text-white`;
  }

  return (
    <button className={`px-4 py-2 rounded ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}