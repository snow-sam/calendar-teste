import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { interval, startOfWeek, lastDayOfWeek} from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createWeekInterval(day: Date = new Date()) {
  return interval(startOfWeek(day, { weekStartsOn: 1 }), lastDayOfWeek(day, { weekStartsOn: 6 }))
}

export function capitalize(str: string){
  return str[0].toUpperCase() + str.slice(1)
}