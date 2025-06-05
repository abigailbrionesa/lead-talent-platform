import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitBirthday(birthdayString: string): { birthday_day: string; birthday_month: string; birthday_year: string } {
  const [year, month, day] = birthdayString.split("-");
  return {
    birthday_day: day || "",
    birthday_month: month || "",
    birthday_year: year || "",
  };
}

export function combineBirthday(fields: { day: string; month: string; year: string }): string {
  const { day, month, year } = fields;
  return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}