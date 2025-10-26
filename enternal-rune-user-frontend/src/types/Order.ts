import { Address } from "@/types/Address"
import { OrderDetail } from "@/types/OrderDetail"
import { User } from "@/types/User"
import { PaymentStatus } from "@/types/enums/PaymentStatus"
import { ShippingStatus } from "@/types/enums/ShippingStatus"

export type Order = {
    orderUser: User
    orderDate: Date
    orderTotalPrice: number
    orderShippingAddress: Address
    orderPaymentStatus: PaymentStatus
    orderShippingStatus: ShippingStatus
    orderListDetails: OrderDetail[]
}