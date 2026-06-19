import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Digits-only phone number for wa.me links, defaulting to the +91 (India) country code. */
export function toWhatsAppDigits(rawPhone: string) {
  const digits = rawPhone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

export function buildWhatsAppLink(phone: string, message: string) {
  return `https://wa.me/${toWhatsAppDigits(phone)}?text=${encodeURIComponent(message)}`;
}
