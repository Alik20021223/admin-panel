import { useMutation, useQueryClient } from "@tanstack/react-query";
import landingsService from "@entities/landing/service/index.service";
import { ButtonsPro } from "@entities/landing/types";

export function useUpdateButtonLanding() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["update-landing-button"],
    mutationFn: ({ payload, id }: { payload: ButtonsPro; id: string }) =>
      landingsService.putLandingProButton(payload, id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-landings"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
