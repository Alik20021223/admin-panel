import { useMutation, useQueryClient } from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";

export function useDeleteLanding() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["delete-landing"],
    mutationFn: (payload: string) =>
      landingsService.deleteFromLandingList(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["list-landings"] }),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
