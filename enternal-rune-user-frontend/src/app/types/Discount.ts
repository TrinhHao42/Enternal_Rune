enum TargetType {
    ORDER = 'ORDER',
    PRODUCT = 'PRODUCT',
    EVENT = 'EVENT'
} 

enum ValueType {
    FIXED = 'FIXED',
    PERCENT = 'PERCENT'
}

type Discount = {
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

export default Discount;