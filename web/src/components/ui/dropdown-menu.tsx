import * as React from "react";
import { cn } from "@/lib/utils";

export const DropdownMenu = ({ children }: React.PropsWithChildren) => (
  <div className="relative inline-block">{children}</div>
);

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn(className)} {...props} />
  )
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("absolute mt-2 rounded-md border bg-white shadow-md", className)} {...props} />
  )
);
DropdownMenuContent.displayName = "DropdownMenuContent";
