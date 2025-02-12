import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDaysLeft(targetDate: string): string {
  const today = new Date();
  const target = new Date(targetDate);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.abs(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) {
    return "present";
  } else if (diffDays === 1) {
    return "1 day";
  } else {
    return `${diffDays} days ago`;
  }
}
