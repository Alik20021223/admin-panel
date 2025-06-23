import { useMutation, useQueryClient } from "@tanstack/react-query";
import loginRegisterService from "@entities/login-register/service/login-register.service";
import { loginType } from "@entities/login-register/types";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useMutationPostLogin() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: loginType) => loginRegisterService.PostLogin(payload),

    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Успешный вход");
    },

    onError: (error: AxiosError<unknown>) => {
      const status = error.response?.status;

      if (status === 400) {
        toast.error("Неверный логин или пароль");
      } else if (status && status >= 500) {
        toast.error("Ошибка входа. Попробуйте позже");
      } else if (!status) {
        toast.error("Сервер не ответил. Проверьте соединение");
      } else {
        toast.error("Неизвестная ошибка");
      }
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
