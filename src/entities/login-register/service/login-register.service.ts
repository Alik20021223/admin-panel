import { axiosInstance } from "@utils/axios";
import { LR_URL } from "@entities/login-register/constant/api-url";
import { loginType } from "@entities/login-register/types";

class LoginRegisterService {
  async PostLogin(payload: loginType) {
    const response = await axiosInstance.post(LR_URL.login, payload);

    return response;
  }

  async PostLogOut() {
    const response = await axiosInstance.post(LR_URL.logOut);

    return response;
  }

  async PostRegister(payload: loginType) {
    const response = await axiosInstance.post(LR_URL.register, payload);

    return response;
  }
}

export default new LoginRegisterService();
