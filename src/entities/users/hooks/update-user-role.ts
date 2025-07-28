import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "@entities/users/service/index.service";
import { UpdateRole } from "@entities/users/types";

export function UpdateUserRole() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["update-user-role"],
    mutationFn: ({ payload, id }: { payload: UpdateRole; id: string }) =>
      usersService.UpdateRole(payload, id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["list-users"] }),
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
