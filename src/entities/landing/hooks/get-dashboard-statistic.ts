import { useQuery } from "@tanstack/react-query";
import landingsService from "@entities/landing/service";

export function useQueryListLanding() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["list-statistic"],
    queryFn: () => landingsService.getListLandings(),
    retry: false,
  });

  return { isLoading, isError, data, error, refetch };
}
