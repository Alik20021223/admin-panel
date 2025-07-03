import { useMutation, useQueryClient } from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";
import { CreateProLanding } from "@entities/landing/types";

export function useCreateProLanding() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["create-landing-pro"],
    mutationFn: (payload: CreateProLanding) =>
      landingsService.createLandingPro(payload),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
