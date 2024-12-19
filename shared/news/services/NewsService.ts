import ApiServer from "@/shared/system/service/ApiServer";
import NewsDTO from "../dto/NewsDTO";

class NewsService extends ApiServer {
  getAllNews = async (): Promise<NewsDTO[]> => {
    const response = await this.api<null, NewsDTO[]>(
      `/news`,
      "GET",
      null,
      "" 
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch news.");
    }
  };


  getNewsByCode = async (code: string): Promise<NewsDTO> => {
    const response = await this.api<null, NewsDTO>(
      `/news/${code}`,
      "GET",
      null,
      "" 
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch news.");
    }
  }
}

export default NewsService;
