import { useMutation, useQueryClient } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";
// import { AddChannelPhoto } from "@entities/spots/types";

export function useSpotAddPhoto() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["spot-add-channel-hello"],
    mutationFn: (payload: FormData) => spotsService.AddChannelPhoto(payload),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
