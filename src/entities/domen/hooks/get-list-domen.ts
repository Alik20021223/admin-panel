import { useQuery } from "@tanstack/react-query";
import DomainService from "@entities/domen/service/index.service";
import { DomainResponse } from "@entities/domen/types";

export function useQueryListDomain() {
  const { isLoading, isError, data, error, refetch } = useQuery<DomainResponse>(
    {
      queryKey: ["list-domen"],
      queryFn: () => DomainService.getListDomen(),
      retry: false,
    }
  );

  return { isLoading, isError, data, error, refetch };
}
