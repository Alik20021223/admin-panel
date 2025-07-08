import { useMutation, useQueryClient } from "@tanstack/react-query";
import landingsService from "@entities/landing/service/index.service";
import { ButtonsPro } from "@entities/landing/types";

export function useCreateProTranslate() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["create-landing-pro-translate"],
    mutationFn: (payload: ButtonsPro) =>
      landingsService.createLandingProButton(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-landings"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
