import { useMutation, useQueryClient } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";
import { CheckChannelType } from "@entities/spots/types";

export function useCreateSpot() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["create-spot"],
    mutationFn: (payload: CheckChannelType) => spotsService.CreateSpot(payload),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
