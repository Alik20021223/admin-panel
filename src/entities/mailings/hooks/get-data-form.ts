import { useQuery } from "@tanstack/react-query";
// import spotsService from "@/entities/spots/service/index.service";
// import { ListSpotsResponseType } from "@entities/spots/types";
import mailingService from "@entities/mailings/service/index.service";

// const initialData: ListSpotsResponseType = {
//   user: {
//     id: 1,
//     role: "",
//   },
//   spots: [],
// };

export function useQueryListMailing() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["get-data-mailing-form"],
    queryFn: () => mailingService.getMailingForm(),
    retry: false,
    // initialData: initialData,
  });

  return { isLoading, isError, data, error, refetch };
}
