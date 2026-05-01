import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  asChild,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-teal-700 text-white hover:bg-teal-800 focus-visible:outline-teal-700",
        variant === "secondary" &&
          "border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-100",
        variant === "ghost" && "text-neutral-700 hover:bg-neutral-100",
        className
      )}
      {...props}
    />
  );
}
