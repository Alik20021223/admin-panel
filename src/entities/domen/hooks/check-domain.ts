/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DomainService from "@entities/domen/service/index.service";
import { toast } from "sonner";

export function useCheckDomain() {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError, isPending, isIdle } = useMutation({
    mutationKey: ["check-domain"],
    mutationFn: (payload: string) => DomainService.checkDomain(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({});
      toast.success(data.message || "Успешная проверка домена");
    },
    onError: (error: any) => {
      // Вариант с выводом сообщения ошибки
      toast.error(
        error?.response?.data?.message || "Ошибка при проверке домена"
      );
    },
  });

  return { mutateAsync, isSuccess, isError, isPending, isIdle };
}
