import { ProductVariant } from "./ProductVariant";

export type CartItem = {
    ciId: number,
    ciProductVariant: ProductVariant,
    ciQuantity: number
}