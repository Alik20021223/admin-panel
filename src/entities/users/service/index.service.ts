import { axiosInstance } from "@shared/utils/axios";
import { USERS_URL } from "@entities/users/constant/api_url";
import { UpdateRole, UserResponse } from "@entities/users/types";

class users_service {
  async getListUsers() {
    const result = await axiosInstance.get<UserResponse>(USERS_URL.LIST);

    return result.data;
  }

  async UpdateRole(payload: UpdateRole, id: string) {
    const result = await axiosInstance.patch(`${USERS_URL.LIST}/${id}/role`, payload);

    return result.data;
  }
}

export default new users_service();
