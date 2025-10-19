'use client'
import styles from '../Cart.module.scss'
import { useCart } from '@/context/CartContext'
import { TriangleAlert, Loader2, ArrowBigLeft } from "lucide-react"
import { Cart } from '@/icons'

const CartItemList = () => {
    const { cartItems, loading, error } = useCart();

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                <span className={`${styles.loadingDots} text-xl`}>Đang tải giỏ hàng</span>
            </div>
        )

    if (error)
        return (
            <div className="flex flex-col items-center justify-center py-10 gap-4 animate-fadeIn">
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-6 py-4 rounded-2xl shadow-sm">
                    <TriangleAlert className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-lg font-medium">
                        {error || "Đã xảy ra lỗi, vui lòng thử lại sau."}
                    </p>
                </div>
            </div>
        );

    if (cartItems.length === 0)
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-4 animate-fadeIn">
                <div className="px-8 py-10 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Giỏ hàng của bạn đang trống <Cart className="inline-block h-0.5 w-0.5" />
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Có vẻ như bạn chưa thêm sản phẩm nào. Hãy khám phá ngay!
                    </p>
                    <button
                        className="inline-flex items-center rounded-lg active:scale-95 transition-transform duration-150 cursor-pointer"
                        onClick={() => { }}
                    >
                        <ArrowBigLeft className="w-5 h-5" />
                        <span>Tiếp tục mua sắm</span>
                    </button>
                </div>
            </div>
        );
}

export default CartItemList
