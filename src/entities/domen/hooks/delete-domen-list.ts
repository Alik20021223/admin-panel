import { useMutation, useQueryClient } from "@tanstack/react-query";
import DomainService from "@entities/domen/service/index.service";

export function useDeleteDomain() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["delete-domen"],
    mutationFn: (payload: string) => DomainService.deleteDomenFromList(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["list-domen"] }),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
