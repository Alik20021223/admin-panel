import { useMutation, useQueryClient } from "@tanstack/react-query";
import mailingService from "@entities/mailings/service/index.service";
import { CreateMailingType } from "@entities/mailings/types";

export function useCreateMailing() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["create-mailing"],
    mutationFn: (payload: CreateMailingType) =>
      mailingService.createMailingFromList(payload),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
