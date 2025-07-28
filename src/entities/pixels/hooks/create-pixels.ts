import { useMutation, useQueryClient } from "@tanstack/react-query";
import pixelService from "@entities/pixels/service/index.service";
import { pixelTypePost } from "@entities/pixels/types";

export function useCreatePixels() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["create-pixel"],
    mutationFn: (payload: pixelTypePost) =>
      pixelService.createPixelFromList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-pixels"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
