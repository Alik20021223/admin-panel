import { useMutation, useQueryClient } from "@tanstack/react-query";
import mailingService from "@entities/mailings/service/index.service";

export function useDeleteMailing() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["delete-mailing"],
    mutationFn: (payload: number) =>
      mailingService.deleteMailingFromList(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["list-mailings"] }),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
