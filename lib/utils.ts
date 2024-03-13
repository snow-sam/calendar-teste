import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { setDefaultOptions, interval, eachDayOfInterval, startOfWeek, lastDayOfWeek, format, addWeeks, subWeeks } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createWeekInterval(day: Date = new Date()) {
  return interval(startOfWeek(day, { weekStartsOn: 1 }), lastDayOfWeek(day, { weekStartsOn: 6 }))
}
