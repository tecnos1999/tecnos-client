import { Category } from "@/shared/category/models/Category";
import { ItemCategory } from "@/shared/itemcategory/models/ItemCategory";
import { Subcategory } from "@/shared/subcategory/models/Subcategory";
import { Image } from "@/shared/image/models/Image";


export interface Product {
    id: number;
    name: string;
    sku: string;
    description: string;
    broschure: string;
    tehnic: string;
    catalog: string;
    linkVideo: string;
    createdAt: Date;
    updatedAt: Date;
    itemCategory: ItemCategory;
    category: Category;
    subCategory: Subcategory;
    images: Image[];
}
