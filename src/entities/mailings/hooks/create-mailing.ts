import { useMutation, useQueryClient } from "@tanstack/react-query";
import mailingService from "@entities/mailings/service/index.service";

export function useCreateMailing() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["create-mailing"],
    mutationFn: (payload: FormData) =>
      mailingService.createMailingFromList(payload),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
