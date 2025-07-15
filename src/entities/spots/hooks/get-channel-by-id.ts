import { useQuery } from "@tanstack/react-query";
import spotsService from "@entities/spots/service/index.service";
import { ChannelResponse } from "@entities/spots/types/response";

export function useGetInfoSpotChannel(id: string) {
  return useQuery<ChannelResponse>({
    queryKey: ["get-spot-channel-by-id", id],
    queryFn: () => spotsService.getInfoSpotById(id),
    retry: false,
    enabled: !!id,
  });
}
