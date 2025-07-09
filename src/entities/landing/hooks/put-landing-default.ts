import { useMutation, useQueryClient } from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";
import { CreateDefaultLanding } from "@entities/landing/types";

export function useUpdateDefaultLanding() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["update-landing-default"],
    mutationFn: ({
      payload,
      id,
    }: {
      payload: CreateDefaultLanding;
      id: string;
    }) => landingsService.putLandingDefault(payload, id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-landings"] });
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
