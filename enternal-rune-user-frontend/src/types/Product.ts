import { Image } from "./Image";

// Define the Product interface based on the JSON structure
export type Product = {
  prodId: number;
  prodName: string;
  prodBrand: number;
  prodModel: string;
  prodVersion: string[];
  prodColor: string[];
  prodImgUrl: Image[];
  prodDescription: string;
  prodStatus: string;
  prodRating: number;
  prodPrice?: number;
  prodOriginalPrice?: number;
}