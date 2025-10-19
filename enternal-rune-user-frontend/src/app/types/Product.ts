import Brand from "../../types/Brand"
import ProductPrice from "./ProductPrice"

type Image = {
    imgData: string
    imgName: string
}

type Product = {
    prodName: string
    prodBrand: Brand
    prodDescription: string
    prodModel: string
    prodColor: string[]
    prodImage: Image[]
    prodVersion: string[]
    prodRating: number
    prodPrice: ProductPrice
}

export default Product