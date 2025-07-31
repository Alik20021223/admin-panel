import { useQuery } from "@tanstack/react-query";
import statisticService from "@entities/statistic/service";
import { AdData } from "../types/response";

export function useGetDataForm() {
  const { isLoading, isError, data, error, refetch } = useQuery<AdData>({
    queryKey: ["get-statistic-form-data"],
    queryFn: () => statisticService.getDataForm(),
    retry: false,
  });

  return { isLoading, isError, data, error, refetch };
}
