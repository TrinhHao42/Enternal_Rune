import { Image } from "./Image";
import { ProductPrice } from "./ProductPrice";

export type ProductVariant = {
    prodvId: number;
    prodvProduct: number;
    prodvName: string;
    prodvImage: Image;
    prodvModel: string;
    prodvVersion: string;
    prodvColor: string;
    prodvPrice: ProductPrice;
};
