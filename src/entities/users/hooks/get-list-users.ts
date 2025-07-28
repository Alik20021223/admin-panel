import { useQuery } from "@tanstack/react-query";
import usersService from "@entities/users/service/index.service";
import { UserResponse } from "@entities/users/types";

export function useQueryListUsers() {
  const { isLoading, isError, data, error, refetch } = useQuery<UserResponse>({
    queryKey: ["list-users"],
    queryFn: () => usersService.getListUsers(),
    retry: false,
  });

  return { isLoading, isError, data: data?.user_list, error, refetch };
}
