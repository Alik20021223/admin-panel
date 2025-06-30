import { useQuery } from "@tanstack/react-query";
import appService from "@shared/service";

export function useQueryInfoUser() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["info-profile"],
    queryFn: () => appService.GetInfoUser(),
    retry: false,
  });

  return { isLoading, isError, data: data?.user, error, refetch };
}
