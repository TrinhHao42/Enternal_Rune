import { Image } from "./Image";
import { ProductPrice } from "./ProductPrice";

export type ProductVariant = {
    prodvId: number;
    prodvProduct: number;
    prodvName: string;
    prodvImage: Image;
    prodvVersion: string;
    prodvColor: string;
    prodvPrice: ProductPrice;
};
