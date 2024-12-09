import ApiServer from "@/shared/system/service/ApiServer";
import WebinarDTO from "../dto/WebinarDTO";

class WebinarService extends ApiServer {
  

  getAllWebinars = async (): Promise<WebinarDTO[]> => {
    const response = await this.api<null, WebinarDTO[]>(
      `/webinars`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch webinars");
    }
  };

  getWebinarByCode = async (webCode: string): Promise<WebinarDTO> => {
    const response = await this.api<null, WebinarDTO>(
      `/webinars/${webCode}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch webinar");
    }
  };
}

export default WebinarService;
