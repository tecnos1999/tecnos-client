import ApiServer from "@/shared/system/service/ApiServer";
import CarouselDTO from "../dto/CarouselDTO";

class CarouselService extends ApiServer {
   
  getAllCarouselItems = async (): Promise<CarouselDTO[]> => {
    const response = await this.api<null, CarouselDTO[]>(
      `/carousel`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch carousel items.");
    }
  };

 
}

export default CarouselService;
