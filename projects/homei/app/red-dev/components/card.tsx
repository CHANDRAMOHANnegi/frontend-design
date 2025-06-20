import { ComponentPropsWithoutRef } from "react";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant: "default";
  hover?: boolean;
};

export const Card = ({
  children,
  className = "",
  hover = false,
  ...rest
}: CardProps) => (
  <div
    className={`bg-white border border-gray-200 rounded-lg ${
      hover ? "hover:shadow-md cursor-pointer" : ""
    } transition-shadow ${className}`}
    {...rest}
  >
    {children}
  </div>
);
