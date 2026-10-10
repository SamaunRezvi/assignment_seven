import { siteConfig } from "@/config/site";
import type { PriceUnit } from "@/types/product";

const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";

const numberFormatter = new Intl.NumberFormat(siteConfig.locale, {
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat(siteConfig.locale, {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const unitLabels: Record<PriceUnit, { full: string; short: string }> = {
  kg: { full: "প্রতি কেজি", short: "কেজি" },
  litre: { full: "প্রতি লিটার", short: "লিটার" },
  dozen: { full: "প্রতি ডজন", short: "ডজন" },
  piece: { full: "প্রতি পিস", short: "পিস" },
};

/** Converts any Bengali digits in the input to ASCII digits. */
export function toAsciiDigits(value: string): string {
  return value.replace(/[০-৯]/g, (digit) => String(BENGALI_DIGITS.indexOf(digit)));
}

/** Parses a number written with Bengali or ASCII digits, returns NaN when invalid. */
export function parseBengaliNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const normalised = toAsciiDigits(value).replace(/[,\s]/g, "").replace(/টাকা/g, "");
  return Number(normalised);
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

const decimalNumberFormatter = new Intl.NumberFormat(siteConfig.locale, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Whole amounts stay plain (৬২ টাকা), halves show two decimals (৬৩.৫০ টাকা). */
export function formatMarketPrice(value: number): string {
  const amount = Number.isInteger(value)
    ? formatNumber(value)
    : decimalNumberFormatter.format(value);
  return `${amount} টাকা`;
}

export function formatPrice(value: number): string {
  return `${formatNumber(value)} টাকা`;
}

export function formatPercent(value: number): string {
  return `${percentFormatter.format(Math.abs(value))}%`;
}

export function formatUnit(unit: PriceUnit): string {
  return unitLabels[unit].full;
}

export function formatShortUnit(unit: PriceUnit): string {
  return unitLabels[unit].short;
}

export function formatBengaliDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat(siteConfig.locale, {
    timeZone: siteConfig.timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${pick("weekday")}, ${pick("day")} ${pick("month")}, ${pick("year")}`;
}
