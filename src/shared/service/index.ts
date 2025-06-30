import { axiosInstance } from "@shared/utils/axios";
import { SHARED_URL } from "@shared/constants/api-url";
import { DomainListResponse, UserInfoResponse } from "@shared/types";

class SharedService {
  async GetInfoUser(): Promise<UserInfoResponse> {
    const response = await axiosInstance.get<UserInfoResponse>(
      SHARED_URL.info_me
    );

    return response.data;
  }

  async GetDomainsList(): Promise<DomainListResponse> {
    const response = await axiosInstance.get<DomainListResponse>(
      SHARED_URL.domainList
    );

    return response.data;
  }
}

export default new SharedService();
