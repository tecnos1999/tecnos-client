import { ProductDTO } from "../dto/ProductDTO";
import ApiServer from "@/shared/system/service/ApiServer";

class ProductService extends ApiServer {
  getProductBySku = async (sku: string): Promise<ProductDTO> => {
    const response = await this.api<null, any>(
      `/product/${sku}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as ProductDTO;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch product");
    }
  };

  getProducts = async (): Promise<ProductDTO[]> => {
    const response = await this.api<null, any>(
      `/product/all`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as ProductDTO[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch products");
    }
  };

  getProductsByCategoryAndSubCategory = async (
    category: string,
    subCategory: string
  ): Promise<ProductDTO[]> => {
    const response = await this.api<null, any>(
      `/product/category/${category}/subcategory/${subCategory}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as ProductDTO[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch products");
    }
  };

  getProductsByCategorySubCategoryAndItemCategory = async (
    category: string,
    subCategory: string,
    itemCategory: string
  ): Promise<ProductDTO[]> => {
    const response = await this.api<null, any>(
      `/product/category/${category}/subcategory/${subCategory}/item-category/${itemCategory}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as ProductDTO[];
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Failed to fetch products");
    }
  };
}

export default ProductService;
