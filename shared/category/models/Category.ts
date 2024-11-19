import { ItemCategory } from "@/shared/itemcategory/models/ItemCategory";
import { Subcategory } from "@/shared/subcategory/models/Subcategory";

export interface Category{
    name: string;
    createdAt: Date;
    updatedAt: Date;
    subCategories: Subcategory[];
    itemCategories:ItemCategory[]; 
    mainSection: string;
}