import ApiServer from "@/shared/system/service/ApiServer";
import { Category } from "../models/Category";

class CategoryService extends ApiServer {
 
  getCategories = async (): Promise<Category[]> => {
    const response = await this.api<null, any>(
      `/category/findAll`,
      "GET",
      null,
      "" 
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as Category[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch categories");
    }
  };

  
}

export default CategoryService;
