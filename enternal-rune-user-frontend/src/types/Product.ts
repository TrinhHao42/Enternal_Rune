import { Image } from "./Image";

// Product specifications object (partial - flexible keys)
export type ProdSpecs = {
  [key: string]: string | number | boolean
}

// Define the Product interface based on the JSON structure and code usage
export type Product = {
  // primary identifier - using 'id' to match products.json and new db.json
  id: string,
  prodName: string
  prodBrand?: number
  prodModel?: string
  prodVersion?: string[]
  prodColor: string[]
  prodImg: Image[]
  prodDescription?: string
  prodSpecs?: ProdSpecs
  prodStatus?: string
  prodRating: number
  prodPrice?: number
  prodOriginalPrice?: number
}