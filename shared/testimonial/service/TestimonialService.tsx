import ApiServer from "@/shared/system/service/ApiServer";
import TestimonialDTO from "../dto/TestimonialDTO";

class TestimonialService extends ApiServer {

  getAllTestimonials = async (): Promise<TestimonialDTO[]> => {
    const response = await this.api<null, TestimonialDTO[]>(
      `/testimonials`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch testimonials");
    }
  };

  getTestimonialByCode = async (code: string): Promise<TestimonialDTO> => {
    const response = await this.api<null, TestimonialDTO>(
      `/testimonials/${code}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch testimonial");
    }
  };
}

export default TestimonialService;
