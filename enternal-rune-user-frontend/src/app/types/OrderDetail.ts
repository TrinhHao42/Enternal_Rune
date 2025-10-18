import Product from "./Product";
import ProductPrice from "./ProductPrice";


type OrderDetail = {
    odProduct: Product
    odQuantity: number
    odPrice: ProductPrice
    odTotalPrice: number
}

export default OrderDetail;