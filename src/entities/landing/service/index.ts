import { axiosInstance } from "@shared/utils/axios";
import { LANDINGS_URL } from "@entities/landing/constant/api_url";
import { InfoAddFormResponseType, ListLandingResponseType } from "../types";

class Landings_service {
  async getListLandings(): Promise<ListLandingResponseType> {
    const result = await axiosInstance.get<ListLandingResponseType>(
      LANDINGS_URL.LIST
    );

    return result.data;
  }

  async getInfoAddForm(): Promise<InfoAddFormResponseType> {
    const result = await axiosInstance.get<InfoAddFormResponseType>(
      LANDINGS_URL.INFO_ADD_FORM
    );

    return result.data;
  }
}

export default new Landings_service();
