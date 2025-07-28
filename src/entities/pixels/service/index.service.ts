import { axiosInstance } from "@shared/utils/axios";
// import { ListMailingsResponseType } from "@entities/spots/types";
import { PIXEL_URL } from "@entities/pixels/constant/api_url";
import { pixelTypePost } from "@entities/pixels/types";

class pixels_service {
  async getListPixels() {
    const result = await axiosInstance.get(PIXEL_URL.LIST);

    return result.data;
  }

  // async deleteDomenFromList(id: string) {
  //   const result = await axiosInstance.delete(`${DOMEN_URL.LIST}/${id}`);

  //   return result.data;
  // }

  async createPixelFromList(payload: pixelTypePost) {
    const result = await axiosInstance.post(PIXEL_URL.LIST, payload);

    return result.data;
  }

  async UpdatePixelList(payload: pixelTypePost) {
    const result = await axiosInstance.put(PIXEL_URL.LIST, payload);

    return result.data;
  }
}

export default new pixels_service();
