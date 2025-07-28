import { useQuery } from "@tanstack/react-query";
import statisticService from "@entities/statistic/service";
import { StatisticResponse } from "@entities/statistic/types";

export function useQueryDashboardStatistic() {
  const { isLoading, isError, data, error, refetch } =
    useQuery<StatisticResponse>({
      queryKey: ["dashboard-statistic"],
      queryFn: () => statisticService.getDataDashboardStatistic(),
      retry: false,
    });

  return { isLoading, isError, data, error, refetch };
}
