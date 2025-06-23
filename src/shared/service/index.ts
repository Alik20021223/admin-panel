import { axiosInstance } from "@shared/utils/axios";
import { SHARED_URL } from "@shared/constants/api-url";
import { UserInfoResponse } from "@shared/types";

class SharedService {
  async GetInfoUser(): Promise<UserInfoResponse> {
    const response = await axiosInstance.get<UserInfoResponse>(
      SHARED_URL.info_me
    );

    return response.data;
  }
}

export default new SharedService();
