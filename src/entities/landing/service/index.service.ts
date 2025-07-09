import { axiosInstance } from "@shared/utils/axios";
import { LANDINGS_URL } from "@entities/landing/constant/api_url";
import {
  ButtonsPro,
  CreateDefaultLanding,
  // CreateProDesign,
  CreateProLanding,
  InfoAddFormResponseType,
  ListLandingResponseType,
  LandingData,
} from "@entities/landing/types";

class Landings_service {
  // Get

  async getListLandings(): Promise<ListLandingResponseType> {
    const result = await axiosInstance.get<ListLandingResponseType>(
      LANDINGS_URL.LIST
    );

    return result.data;
  }

  async getLandingById(id: string): Promise<LandingData> {
    const result = await axiosInstance.get<LandingData>(
      `${LANDINGS_URL.LIST}/${id}`
    );

    return result.data;
  }

  async getInfoAddForm(): Promise<InfoAddFormResponseType> {
    const result = await axiosInstance.get<InfoAddFormResponseType>(
      LANDINGS_URL.INFO_ADD_FORM
    );

    return result.data;
  }

  // delete

  async deleteFromLandingList(id: string) {
    const result = await axiosInstance.delete(`${LANDINGS_URL.LIST}/${id}`);

    return result.data;
  }

  // Create

  async createLandingDefault(payload: CreateDefaultLanding) {
    const result = await axiosInstance.post(LANDINGS_URL.DEFAULT, payload);

    return result.data;
  }

  async createLandingPro(payload: CreateProLanding) {
    const result = await axiosInstance.post(LANDINGS_URL.PRO, payload);

    return result.data;
  }

  async createLandingProDesign(payload: FormData) {
    const result = await axiosInstance.post(LANDINGS_URL.DESIGN, payload);

    return result.data;
  }

  async createLandingProButton(payload: ButtonsPro) {
    const result = await axiosInstance.post(LANDINGS_URL.BUTTONS, payload);

    return result.data;
  }

  // Put

  async putLandingDefault(payload: CreateDefaultLanding, id: string) {
    const result = await axiosInstance.post(
      `${LANDINGS_URL.LIST}/${id}/default`,
      payload
    );

    return result.data;
  }

  async putLandingPro(payload: CreateProLanding, id: string) {
    const result = await axiosInstance.post(
      `${LANDINGS_URL.LIST}/${id}/pro`,
      payload
    );

    return result.data;
  }

  async putLandingProDesign(payload: FormData, id: string) {
    const result = await axiosInstance.post(
      `${LANDINGS_URL.LIST}/${id}/design`,
      payload
    );

    return result.data;
  }

  async putLandingProButton(payload: ButtonsPro, id: string) {
    const result = await axiosInstance.post(
      `${LANDINGS_URL.LIST}/${id}/button`,
      payload
    );

    return result.data;
  }
}

export default new Landings_service();
