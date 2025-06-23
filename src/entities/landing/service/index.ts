import { axiosInstance } from "@shared/utils/axios";
import { LANDINGS_URL } from "@entities/landing/constant/api_url";

class Landings_service {
  async getListLandings() {
    const result = await axiosInstance.get(LANDINGS_URL.LIST);

    return result;
  }
}

export default new Landings_service();
