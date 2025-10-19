import { ProductVariant } from "@/types/ProductVariant";

type CartItem = {
    ciId: number,
    ciProductVariant: ProductVariant
    ciQuantity: number
}

export default CartItem;