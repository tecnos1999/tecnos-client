import ApiServer from "@/shared/system/service/ApiServer";
import { CaptionDTO } from "../dto/CaptionDTO";

class CaptionService extends ApiServer {
  

  getCaptionByCode = async (code: string): Promise<CaptionDTO> => {
    const response = await this.api<null, CaptionDTO>(
      `/captions/${code}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch caption.");
    }
  };

  getAllCaptions = async (): Promise<CaptionDTO[]> => {
    const response = await this.api<null, CaptionDTO[]>(
      `/captions`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch captions.");
    }
  };

  getCaptionsByCodeIn = async (codes: string[]): Promise<CaptionDTO[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append("codes", codes.join(",")); 

    const response = await this.api<null, CaptionDTO[]>(
      `/captions/codes?${queryParams.toString()}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch captions by codes.");
    }
  };
}

export default CaptionService;
