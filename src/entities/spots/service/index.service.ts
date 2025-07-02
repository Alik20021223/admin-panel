import { axiosInstance } from "@shared/utils/axios";
import { SPOTS_URL } from "@entities/spots/constant/api-url";
import { CheckChannelType, ListSpotsResponseType } from "@entities/spots/types";

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
}

export default new Spots_service();
