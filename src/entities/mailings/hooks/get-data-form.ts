import { useQuery } from "@tanstack/react-query";
// import spotsService from "@/entities/spots/service/index.service";
// import { ListSpotsResponseType } from "@entities/spots/types";
import mailingService from "@entities/mailings/service/index.service";
import { GetDataFormMailingForm } from "@entities/mailings/types";

const initialData: GetDataFormMailingForm = {
  mailing_types: ["permanent", "disposable"],
  channels: [],
};

export function useQueryFormMailing() {
  const { isLoading, isError, data, error, refetch } =
    useQuery<GetDataFormMailingForm>({
      queryKey: ["get-data-mailing-form"],
      queryFn: () => mailingService.getMailingForm(),
      retry: false,
      initialData: initialData,
    });

  return { isLoading, isError, data, error, refetch };
}
