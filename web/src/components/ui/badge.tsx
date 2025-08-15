import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold", className)} {...props} />
));
Badge.displayName = "Badge";

export { Badge };
