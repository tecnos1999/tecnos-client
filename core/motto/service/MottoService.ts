import ApiServer from "@/shared/system/service/ApiServer";
import MottoDTO from "../dto/MottoDTO";

class MottoService extends ApiServer {
  async getAllMottos(): Promise<MottoDTO[]> {
    const response = await this.api<null, MottoDTO[]>("/motto", "GET", null, "");
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch mottos.");
    }
  }
}

export default MottoService;
