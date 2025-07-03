import { axiosInstance } from "@shared/utils/axios";
import { LANDINGS_URL } from "@entities/landing/constant/api_url";
import {
  CreateDefaultLanding,
  // CreateProDesign,
  CreateProLanding,
  InfoAddFormResponseType,
  ListLandingResponseType,
} from "@entities/landing/types";

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

  async deleteFromLandingList(id: number) {
    const result = await axiosInstance.delete(`${LANDINGS_URL.LIST}/${id}`);

    return result.data;
  }

  async createLandingDefault(payload: CreateDefaultLanding) {
    const result = await axiosInstance.post(LANDINGS_URL.DEFAULT, payload);

    return result.data;
  }

  async createLandingPro(payload: CreateProLanding) {
    const result = await axiosInstance.post(LANDINGS_URL.DEFAULT, payload);

    return result.data;
  }

  async createLandingProDesign(payload: FormData) {
    const result = await axiosInstance.post(LANDINGS_URL.DESIGN, payload);

    return result.data;
  }
}

export default new Landings_service();
