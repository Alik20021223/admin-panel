import { useMutation, useQueryClient } from "@tanstack/react-query";
import DomainService from "@entities/domen/service/index.service";
import { EditFormType } from "@/entities/domen/ui/add-domen/validation";

export function useCreateDomain() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["create-domen"],
    mutationFn: (payload: EditFormType) =>
      DomainService.createDomenFromList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-domen"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
