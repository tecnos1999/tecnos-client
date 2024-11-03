import ApiServer from "@/shared/system/service/ApiServer";
import { Subcategory } from "../models/Subcategory";

class SubCategoryService extends ApiServer {
  


  getSubcategories = async (): Promise<Subcategory[]> => {
    const response = await this.api<null, any>(
      `/subcategory/all`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as Subcategory[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch subcategories");
    }
  };

 
}

export default SubCategoryService;
