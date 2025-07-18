import * as React from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "ghost";
  size?: "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "outline"
            ? "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100"
            : variant === "ghost"
              ? "bg-transparent hover:bg-gray-100 text-gray-900"
              : "bg-blue-600 text-white hover:bg-blue-700",
          size === "sm"
            ? "px-3 py-1.5 text-sm"
            : size === "lg"
              ? "px-8 py-4 text-lg"
              : "px-4 py-2",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
