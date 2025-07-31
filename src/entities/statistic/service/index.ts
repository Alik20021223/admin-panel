import { axiosInstance } from "@shared/utils/axios";
import { STATISTIC_URL } from "@entities/statistic/constant/api_url";
import { FormType } from "@entities/statistic/types";

class statistic_service {
  async getDataDashboardStatistic() {
    const result = await axiosInstance.get(STATISTIC_URL.DASHBOARD_STATISTICS);

    return result.data;
  }

  async getDashboardStatisticFilter(payload: FormType | null) {
    const query = payload ? buildQueryFromPayload(payload) : "";
    const url = query
      ? `${STATISTIC_URL.DASHBOARD_STATISTICS_FILTER}?${query}`
      : `${STATISTIC_URL.DASHBOARD_STATISTICS_FILTER}`;

    const result = await axiosInstance.get(url);
    return result.data;
  }

  async getDataForm() {
    const result = await axiosInstance.get(STATISTIC_URL.DASHBOARD_FILTERS);

    return result.data;
  }
}

export default new statistic_service();

function buildQueryFromPayload(payload: FormType): string {
  const { period, ...rest } = payload;

  const queryObject: Record<string, string> = {};

  // Добавляем period → date_from / date_to
  if (period?.from) queryObject.date_from = formatDate(period.from)!;
  if (period?.to) queryObject.date_to = formatDate(period.to)!;

  // Остальные поля
  Object.entries(rest).forEach(([key, value]) => {
    const val = typeof value === "string" ? value.trim() : value;
    if (val !== "" && val !== undefined && val !== null) {
      queryObject[key] = String(val);
    }
  });

  const params = new URLSearchParams(queryObject);
  return params.toString();
}

function formatDate(date?: Date): string | undefined {
  if (!date) return undefined;
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}
