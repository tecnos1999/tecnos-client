import ApiServer from "@/shared/system/service/ApiServer";
import PartnerDTO from "../dto/PartnersDTO";

class PartnersService extends ApiServer {
  getPartnerByName = async (name: string): Promise<PartnerDTO> => {
    const response = await this.api<null, any>(
      `/partners/${name}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as PartnerDTO; 
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to fetch partner"
      );
    }
  };

  getAllPartners = async (): Promise<PartnerDTO[]> => {
    const response = await this.api<null, any>(
      `/partners`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as PartnerDTO[]
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to fetch partners"
      );
    }
  };

  
}

export default PartnersService;
