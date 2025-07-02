import { useMutation, useQueryClient } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";
import { CheckChannelType } from "@entities/spots/types";

export function useCheckChannel() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["check-channel"],
    mutationFn: (payload: CheckChannelType) =>
      spotsService.CheckChannelStatus(payload),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
