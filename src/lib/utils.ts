import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`
  }
  if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K`
  }
  return price.toString()
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}