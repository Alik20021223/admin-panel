import { useMutation, useQueryClient } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";
import { AddChannelMessage } from "@entities/spots/types";

export function useSpotAddMessage() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["spot-add-channel-hello"],
    mutationFn: (payload: AddChannelMessage) =>
      spotsService.AddChannelMessage(payload),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
