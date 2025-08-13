import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white px-4 py-2 h-10";
    const variants: Record<string, string> = {
      default: "bg-emerald-900 text-white hover:bg-emerald-800",
      outline: "border border-emerald-900 text-emerald-900 bg-white hover:bg-emerald-50",
      secondary: "bg-emerald-50 text-emerald-900 hover:bg-emerald-100",
      ghost: "bg-transparent text-white hover:bg-white/10",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
