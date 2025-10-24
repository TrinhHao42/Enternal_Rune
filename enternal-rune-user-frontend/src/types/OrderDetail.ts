import { Product } from "@/types/Product";
import { ProductPrice } from "@/types/ProductPrice";

export type OrderDetail = {
    odProduct: Product
    odQuantity: number
    odPrice: ProductPrice
    odTotalPrice: number
}