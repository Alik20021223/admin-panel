import { DateRange } from "react-day-picker";

export function formatDateRange(range: DateRange | undefined) {
  if (!range?.from) return "";
  const from = range.from.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const to = range.to
    ? range.to.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";
  return to ? `${from} - ${to}` : from;
}
