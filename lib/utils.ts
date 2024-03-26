import { type ClassValue, clsx } from "clsx"
import { format, parse } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string){
  return str[0].toUpperCase() + str.slice(1)
}

export const parseDate = (date: string) => parse(date, "yyyy-MM-dd", new Date())
export const formatDate = (date: Date, mask = "yyyy-MM-dd") => format(date, mask)