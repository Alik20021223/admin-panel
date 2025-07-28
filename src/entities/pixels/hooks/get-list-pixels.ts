import { useQuery } from "@tanstack/react-query";
import pixelService from "@entities/pixels/service/index.service";
import { pixelsResponse } from "@entities/pixels/types";

export function useQueryListPixels() {
  const { isLoading, isError, data, error, refetch } = useQuery<pixelsResponse>(
    {
      queryKey: ["list-pixels"],
      queryFn: () => pixelService.getListPixels(),
      retry: false,
    }
  );

  return { isLoading, isError, data, error, refetch };
}
