import { useMutation, useQueryClient } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";

export function useUpdateSpotPhoto() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["update-photo-spot"],
    mutationFn: ({ payload, id }: { payload: FormData; id: string }) =>
      spotsService.UpdateChannelPhoto(payload, id),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
