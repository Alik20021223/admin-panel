import { useQuery } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";
import { ListSpotsResponseType } from "@entities/spots/types";

const initialData: ListSpotsResponseType = {
  user: {
    id: 1,
    role: "",
  },
  pixels: [],
  spots: [],
};

export function useQueryListSpots() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["list-spots"],
    queryFn: () => spotsService.getListSpots(),
    retry: false,
    initialData: initialData,
  });

  return { isLoading, isError, data, error, refetch };
}
