import { useMutation, useQueryClient } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";

export function useDeleteSpot() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["delete-spot"],
    mutationFn: (payload: number) => spotsService.deleteFromSpotList(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["list-spots"] }),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
