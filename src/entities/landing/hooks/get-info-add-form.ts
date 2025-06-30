import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";
import { InfoAddFormResponseType } from "@entities/landing/types";
import { MockInitialData } from "../mock";

const initialData: InfoAddFormResponseType = MockInitialData;

export function useQueryInfoAddForm(
  options?: Partial<UseQueryOptions<InfoAddFormResponseType, Error>>
): UseQueryResult<InfoAddFormResponseType, Error> {
  return useQuery<InfoAddFormResponseType, Error>({
    queryKey: ["info-add-form"],
    queryFn: () => landingsService.getInfoAddForm(),
    retry: false,
    initialData,
    ...options,
  });
}
