import { useQuery } from "@tanstack/react-query";
import statisticService from "@entities/statistic/service";
import { FormType, StatisticResponse } from "@entities/statistic/types";

export function useQueryStatisticFilter(payload: FormType | null) {
  const { isLoading, isError, data, error, refetch, isFetching } =
    useQuery<StatisticResponse>({
      queryKey: ["statistic-filter"],
      queryFn: () => statisticService.getDashboardStatisticFilter(payload),
      retry: false,
    });

  return { isLoading, isError, data, error, refetch, isFetching };
}
