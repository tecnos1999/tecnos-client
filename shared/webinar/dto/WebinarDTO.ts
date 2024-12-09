import ImageDTO from "@/shared/image/dto/ImageDTO";

export default interface WebinarDTO {
    webCode: string; 
    title: string; 
    externalLink?: string; 
    createdAt?: string; 
    updatedAt?: string; 
    image?: ImageDTO; 
  }
  
  