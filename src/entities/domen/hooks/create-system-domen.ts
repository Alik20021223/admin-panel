import { useMutation, useQueryClient } from "@tanstack/react-query";
import DomainService from "@entities/domen/service/index.service";
import { EditFormType } from "@/entities/domen/ui/add-domen/validation";

export function useCreateSystemDomain() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["create-system-domen"],
    mutationFn: (payload: EditFormType) =>
      DomainService.createSystemDomain(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-domen"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
