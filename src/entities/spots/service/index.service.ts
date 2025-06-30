import { axiosInstance } from "@shared/utils/axios";
import { SPOTS_URL } from "@entities/spots/constant/api-url";
import { ListSpotsResponseType } from "@entities/spots/types";

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
}

export default new Spots_service();
