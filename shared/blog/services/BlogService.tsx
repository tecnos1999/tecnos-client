import ApiServer from "@/shared/system/service/ApiServer";
import { BlogDTO } from "../dto/BlogDTO";

class BlogService extends ApiServer {
  
  getBlogByCode = async (blogCode: string): Promise<BlogDTO> => {
    const response = await this.api<null, BlogDTO>(
      `/blogs/${blogCode}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch blog.");
    }
  };

  getAllBlogs = async (): Promise<BlogDTO[]> => {
    const response = await this.api<null, BlogDTO[]>(
      "/blogs",
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch blogs.");
    }
  };

  getBlogsByCodeIn = async (codes: string[]): Promise<BlogDTO[]> => {
    const queryParams = new URLSearchParams({ codes: codes.join(",") });

    const response = await this.api<null, BlogDTO[]>(
      `/blogs/getBlogsByCodeIn?${queryParams.toString()}`,
      "GET",
      null,
      ""
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.message || "Failed to fetch blogs by codes.");
    }
  };
}

export default BlogService;
