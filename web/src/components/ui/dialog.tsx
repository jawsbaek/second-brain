import * as React from "react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  children: React.ReactNode;
}
export function Dialog({ open, children }: DialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      {children}
    </div>
  );
}

export const DialogContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-lg bg-white p-6 shadow", className)} {...props} />
);

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4", className)} {...props} />
);

export const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-medium", className)} {...props} />
);
