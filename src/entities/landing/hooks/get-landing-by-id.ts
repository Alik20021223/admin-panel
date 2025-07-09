import { useQuery } from "@tanstack/react-query";
import landingsService from "@/entities/landing/service/index.service";
import { LandingData } from "@entities/landing/types";

export function useGetInfoLanding(id: string) {
  return useQuery<LandingData>({
    queryKey: ["get-landing-by-id", id],
    queryFn: () => landingsService.getLandingById(id),
    retry: false,
    enabled: !!id,
  });
}
