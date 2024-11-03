import { ItemCategory } from "@/shared/itemcategory/models/ItemCategory";

export interface Subcategory {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    categoryName: string;
    itemCategories:ItemCategory[];
}