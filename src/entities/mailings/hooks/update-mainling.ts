import { useMutation, useQueryClient } from "@tanstack/react-query";
import mailingService from "@entities/mailings/service/index.service";

export function useUpdateMailing() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["update-mailing"],
    mutationFn: ({ payload, id }: { payload: FormData; id: string }) =>
      mailingService.UpdateMailing(payload, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-mailing"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
