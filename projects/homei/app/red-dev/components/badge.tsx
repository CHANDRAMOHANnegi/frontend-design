import { ComponentPropsWithoutRef } from "react";

const variants = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
};

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant: "default";
};

export const Badge = ({
  variant = "default",
  children,
  className = "",
  ...rest
}: BadgeProps) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};
