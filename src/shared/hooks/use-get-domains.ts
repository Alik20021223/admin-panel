import { useQuery } from "@tanstack/react-query";
import appService from "@shared/service";

export function useQueryDomainList() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["get-domains-list"],
    queryFn: () => appService.GetDomainsList(),
    retry: false,
  });

  return { isLoading, isError, data, error, refetch };
}
