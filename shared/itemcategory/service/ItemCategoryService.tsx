import ApiServer from "@/shared/system/service/ApiServer";
import { ItemCategory } from "../models/ItemCategory";

class ItemCategoryService extends ApiServer {
  

  getItemCategories = async (): Promise<ItemCategory[]> => {
    const response = await this.api<null, any>(
      `/itemcategory/all`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as ItemCategory[];
    } else {
      return Promise.reject("Failed to fetch item categories");
    }
  };

 

}

export default ItemCategoryService;
