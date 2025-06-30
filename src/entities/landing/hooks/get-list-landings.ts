import { useQuery } from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";
import { ListLandingResponseType } from "@entities/landing/types";

const initialData: ListLandingResponseType = {
  user: {
    id: 1,
    role: "",
  },
  landings: [],
};

export function useQueryListLanding() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["list-landings"],
    queryFn: () => landingsService.getListLandings(),
    retry: false,
    initialData: initialData,
  });

  return { isLoading, isError, data, error, refetch };
}
