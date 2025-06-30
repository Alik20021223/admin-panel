import { useQuery } from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";
import { InfoAddFormResponseType } from "@entities/landing/types";

const initialData: InfoAddFormResponseType = {
  user: {
    id: 1,
    role: "",
  },
  channels: [],
  domains: [],
};

export function useQueryInfoAddForm() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["info-add-form"],
    queryFn: () => landingsService.getInfoAddForm(),
    retry: false,
    initialData: initialData,
  });

  return { isLoading, isError, data: data, error, refetch };
}
