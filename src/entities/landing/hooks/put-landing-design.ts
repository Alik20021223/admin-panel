import { useMutation, useQueryClient } from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";

export function useUpdateDesignLanding() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["update-landing-default"],
    mutationFn: ({ payload, id }: { payload: FormData; id: string }) =>
      landingsService.putLandingProDesign(payload, id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-landings"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
