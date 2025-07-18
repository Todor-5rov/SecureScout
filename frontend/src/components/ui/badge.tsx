import * as React from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "outline";
}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variant === "outline"
          ? "border border-current bg-transparent"
          : "bg-blue-600 text-white",
        className
      )}
      {...props}
    />
  );
}
