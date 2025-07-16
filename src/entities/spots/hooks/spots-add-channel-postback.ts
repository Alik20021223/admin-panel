import { useMutation, useQueryClient } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";
import { AddPixelType } from "@entities/spots/types/response";

export function useSpotAddPostBack() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["spot-add-channel-hello"],
    mutationFn: (payload: AddPixelType) =>
      spotsService.AddChannelPostBack(payload),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
