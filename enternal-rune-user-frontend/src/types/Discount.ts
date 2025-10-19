import { TargetType } from "@/types/enums/DiscountTargetType";
import { ValueType } from "@/types/enums/DiscountValueType";

export type Discount = {
    discountName: string
    discountCode: string
    discountTarget: TargetType
    discountValueType: ValueType
    discountValue: number
    discountMaxAmount?: number
    discountStartDate: Date
    discountEndDate: Date
    discountQuantityLimit?: number
}