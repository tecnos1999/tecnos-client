import ApiServer from "@/shared/system/service/ApiServer";
import { InfoCardDTO } from "../dto/InfoCardDTO";

class InfoCardService extends ApiServer {
  getInfoCardByCode = async (code: string): Promise<InfoCardDTO> => {
    const response = await this.api<null, InfoCardDTO>(
      `/infocard/${code}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch InfoCard.");
    }
  };

  getAllInfoCards = async (): Promise<InfoCardDTO[]> => {
    const response = await this.api<null, InfoCardDTO[]>(
      "/infocard",
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch InfoCards.");
    }
  };
}

export default InfoCardService;
