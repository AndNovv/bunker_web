import { psychoAverage, socialAverage } from "@/data/data"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateMaxAnxietyLevel = (countOfPlayers: number) => {
  return Math.floor(countOfPlayers / 2) * (socialAverage + psychoAverage)
}