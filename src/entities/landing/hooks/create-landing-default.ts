import { useMutation, useQueryClient } from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";
import { CreateDefaultLanding } from "@entities/landing/types";

export function useCreateDefaultLanding() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["create-landing-default"],
    mutationFn: (payload: CreateDefaultLanding) =>
      landingsService.createLandingDefault(payload),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
