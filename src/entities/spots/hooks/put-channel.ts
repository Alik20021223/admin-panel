import { useMutation, useQueryClient } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";
import { UpdateSpot } from "@entities/spots/types/response";

export function useUpdateSpot() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["update-spot"],
    mutationFn: ({ payload, id }: { payload: UpdateSpot; id: string }) =>
      spotsService.UpdateSpot(payload, id),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
