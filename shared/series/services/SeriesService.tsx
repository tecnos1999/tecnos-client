import ApiServer from "@/shared/system/service/ApiServer";
import { SeriesDTO } from "../dto/SeriesDTO";

class SeriesService extends ApiServer {
  getSeriesByCode = async (code: string): Promise<SeriesDTO> => {
    const response = await this.api<null, SeriesDTO>(
      `/series/${code}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch series by code");
    }
  };

  getSeriesByName = async (name: string): Promise<SeriesDTO> => {
    const response = await this.api<null, SeriesDTO>(
      `/series/getSeriesByName?name=${encodeURIComponent(name)}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch series by name");
    }
  };

  
}

export default SeriesService;
