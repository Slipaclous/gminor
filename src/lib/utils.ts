import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** French typography: non-breaking space before ? ! : ; so the sign never wraps alone. */
export function frenchSpacing(text: string) {
  return text.replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ");
}
