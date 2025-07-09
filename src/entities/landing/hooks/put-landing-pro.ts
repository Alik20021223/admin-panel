import { useMutation, useQueryClient } from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";
import { CreateProLanding } from "@entities/landing/types";

export function useUpdateProLanding() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["update-landing-pro"],
    mutationFn: ({ payload, id }: { payload: CreateProLanding; id: string }) =>
      landingsService.putLandingPro(payload, id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-landings"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
