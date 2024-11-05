import { Subcategory } from "@/shared/subcategory/models/Subcategory";

export interface Category{
    name: string;
    createdAt: Date;
    updatedAt: Date;
    subCategories: Subcategory[];
    mainSection: string;
}