import Address from "../../types/Address"
import OrderDetail from "./OrderDetail"
import User from "./User"

enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
    EXPIRED = "EXPIRED"
}

enum ShippingStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
    FAILED_DELIVERY = "FAILED_DELIVERY",
    RETURNED = "RETURNED",
    CANCELLED = "CANCELLED"
}

type Order = {
    orderUser: User
    orderDate: Date
    orderTotalPrice: number
    orderShippingAddress: Address
    orderPaymentStatus: PaymentStatus
    orderShippingStatus: ShippingStatus
    orderListDetails: OrderDetail[]
}

export default Order