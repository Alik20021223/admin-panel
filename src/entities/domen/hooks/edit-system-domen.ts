import { useMutation, useQueryClient } from "@tanstack/react-query";
import DomainService from "@entities/domen/service/index.service";
import { EditFormType } from "@/entities/domen/ui/add-domen/validation";

export function useEditSystemDomain() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["edit-system-domen"],
    mutationFn: ({ payload, id }: { payload: EditFormType; id: string }) =>
      DomainService.editSystemDomain(payload, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-domen"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
