import { useQuery } from "@tanstack/react-query";
import mailingService from "@entities/mailings/service/index.service";

export function useGetInfoMailing(id: string) {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["get-mailing-by-id", id],
    queryFn: () => mailingService.getMailingById(id),
    retry: false,
    enabled: !!id,
    // initialData: initialData,
  });

  return { isLoading, isError, data, error, refetch };
}
