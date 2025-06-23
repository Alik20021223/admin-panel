import { useMutation, useQueryClient } from "@tanstack/react-query";
import loginRegisterService from "@entities/login-register/service/login-register.service";
import { loginType } from "@entities/login-register/types";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useMutationPostRegister() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: loginType) =>
      loginRegisterService.PostRegister(payload),

    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Успешная регистрация");
    },

    onError: (error: AxiosError<unknown>) => {
      const status = error.response?.status;

      if (status === 400) {
        toast.error("Неверный логин или пароль");
      } else if (status && status >= 500) {
        toast.error("Ошибка регистрации Попробуйте позже");
      } else if (!status) {
        toast.error("Сервер не ответил. Проверьте соединение");
      } else {
        toast.error("Неизвестная ошибка");
      }
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
