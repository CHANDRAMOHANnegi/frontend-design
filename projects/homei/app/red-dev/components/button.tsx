// UI Components

import { LucideIcon } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant: "default";
  icon: LucideIcon;
};

export const Button = ({
  variant = "default",
  icon: Icon,
  children,
  className = "",
  ...rest
}: ButtonProps) => {
  const variants = {
    default: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning:
      "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };

  return (
    <button
      className={`inline-flex items-center gap-2 px-3 py-2 font-medium rounded-lg transition-colors ${variants[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};
