import { axiosInstance } from "@shared/utils/axios";
// import { ListMailingsResponseType } from "@entities/spots/types";
import { DOMEN_URL } from "@entities/domen/constant/api_url";
import { EditFormType } from "@/entities/domen/ui/add-domen/validation";

class Domen_service {
  async getListDomen() {
    const result = await axiosInstance.get(DOMEN_URL.LIST);

    return result.data;
  }

  async deleteDomenFromList(id: string) {
    const result = await axiosInstance.delete(`${DOMEN_URL.LIST}/${id}`);

    return result.data;
  }

  async createDomenFromList(payload: EditFormType) {
    const result = await axiosInstance.post(DOMEN_URL.LIST, payload);

    return result.data;
  }
}

export default new Domen_service();
