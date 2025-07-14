import { DateRange } from "react-day-picker";
import { axiosInstance } from "./axios";
// import { SpotType } from "../types";

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

// @shared/utils.ts

export const AUTH_CHECK_KEY = "auth_check";
const ONE_HOUR = 60 * 60 * 1000;

export const isAuthenticated = async (): Promise<boolean> => {
  const cached = localStorage.getItem(AUTH_CHECK_KEY);
  const parsed = cached ? JSON.parse(cached) : null;

  const now = Date.now();

  if (parsed && now - parsed.timestamp < ONE_HOUR) {
    return parsed.status;
  }

  try {
    const res = await axiosInstance.get("auth/check");
    const status = res.status === 200;

    updateAuth(status);

    return status;
  } catch {
    updateAuth(false);

    return false;
  }
};

export const updateAuth = (status: boolean) => {
  localStorage.setItem(
    "auth_check",
    JSON.stringify({
      status,
      timestamp: Date.now(),
    })
  );
  window.dispatchEvent(new Event("auth_check_changed"));
};

export function mapToSelectOptions<T extends Record<string, unknown>>(
  data: T[] = [],
  valueKey: keyof T,
  labelKey: keyof T
): { label: string; value: string }[] {
  return data.map((item) => ({
    value: String(item[valueKey]),
    label: String(item[labelKey]),
  }));
}

export function mergeDateAndTime(date: Date, time: string): string {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const merged = new Date(date);
  merged.setHours(hours);
  merged.setMinutes(minutes);
  merged.setSeconds(seconds || 0);
  return merged.toISOString(); // → формат RFC3339
}

export const statusMap: Record<string, string> = {
  pending: "Ожидает",
  sending: "Отправляется",
  sent: "Отправлено",
  failed: "Ошибка",
};

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // <-- это создаёт base64 строку
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export function fileToBinary(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);

      // Преобразуем в binary string
      let binaryString = "";
      for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
      }

      resolve(binaryString);
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
