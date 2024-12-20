import ImageDTO from "@/shared/image/dto/ImageDTO";

export default interface PartnerDTO {
  name: string;
  description: string;
  catalogFile: string;
  createdAt: string; 
  updatedAt: string; 
  image: ImageDTO;
}
