import { useQuery } from "@tanstack/react-query";
import statisticService from "@entities/statistic/service";

export function useQueryDashboardStatistic() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["dashboard-statistic"],
    queryFn: () => statisticService.getDataDashboardStatistic(),
    retry: false,
  });

  return { isLoading, isError, data, error, refetch };
}
