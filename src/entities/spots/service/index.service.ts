import { axiosInstance } from "@shared/utils/axios";
import { SPOTS_URL } from "@entities/spots/constant/api-url";
import {
  AddChannelMessage,
  // AddChannelPhoto,
  CheckChannelType,
  ListSpotsResponseType,
} from "@entities/spots/types";
import { ChannelResponse } from "@entities/spots/types/response";
import { AddPixelType } from "@entities/spots/types/response";

class Spots_service {
  async getListSpots(): Promise<ListSpotsResponseType> {
    const result = await axiosInstance.get<ListSpotsResponseType>(
      SPOTS_URL.LIST
    );

    return result.data;
  }

  // async getInfoAddForm(): Promise<InfoAddFormResponseType> {
  //   const result = await axiosInstance.get<InfoAddFormResponseType>(
  //     LANDINGS_URL.INFO_ADD_FORM
  //   );

  //   return result.data;
  // }

  async deleteFromSpotList(id: number) {
    const result = await axiosInstance.delete(`${SPOTS_URL.LIST}/${id}`);

    return result.data;
  }

  async CheckChannelStatus(payload: CheckChannelType) {
    const result = await axiosInstance.post(SPOTS_URL.CHECK_CHANNEL, payload);

    return result.data;
  }

  async CreateSpot(payload: CheckChannelType) {
    const result = await axiosInstance.post(SPOTS_URL.LIST, payload);

    return result.data;
  }

  async AddChannelMessage(payload: AddChannelMessage) {
    const result = await axiosInstance.post(
      SPOTS_URL.SPOTS_ADD_MESSAGE,
      payload
    );

    return result.data;
  }

  async AddChannelPostBack(payload: AddPixelType) {
    const result = await axiosInstance.post(
      SPOTS_URL.SPOTS_ADD_PIXELS,
      payload
    );

    return result.data;
  }

  async AddChannelPhoto(payload: FormData) {
    const result = await axiosInstance.post(SPOTS_URL.SPOTS_ADD_PHOTO, payload);

    return result.data;
  }

  async getInfoSpotById(id: string): Promise<ChannelResponse> {
    const result = await axiosInstance.get<ChannelResponse>(
      `${SPOTS_URL.LIST}/${id}`
    );

    return result.data;
  }
}

export default new Spots_service();
