import { axiosInstance } from "@shared/utils/axios";
// import { ListMailingsResponseType } from "@entities/spots/types";
import { MAILINGS_URL } from "@entities/mailings/constant/api_url";


class Mailing_service {
  async getListMailing() {
    const result = await axiosInstance.get(MAILINGS_URL.LIST);

    return result.data;
  }

  // async getInfoAddForm(): Promise<InfoAddFormResponseType> {
  //   const result = await axiosInstance.get<InfoAddFormResponseType>(
  //     LANDINGS_URL.INFO_ADD_FORM
  //   );

  //   return result.data;
  // }

  async deleteMailingFromList(id: number) {
    const result = await axiosInstance.delete(`${MAILINGS_URL.LIST}/${id}`);

    return result.data;
  }
}

export default new Mailing_service();
