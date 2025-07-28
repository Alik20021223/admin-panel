import { axiosInstance } from "@shared/utils/axios";
import { STATISTIC_URL } from "@entities/statistic/constant/api_url";

class statistic_service {
  async getDataDashboardStatistic() {
    const result = await axiosInstance.get(STATISTIC_URL.DASHBOARD_STATISTICS);

    return result.data;
  }
}

export default new statistic_service();
