import { CartItem } from '@/types/CartItem'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useCheckout } from '@/context/CheckoutContext'

const CartSummary = ({ choosedItems }: { choosedItems: CartItem[] }) => {
    const router = useRouter();
    const { setCheckoutItems } = useCheckout();

    const handleCheckout = () => {
        if (choosedItems.length > 0) {
            setCheckoutItems(choosedItems);
            router.push('/PaymentScreen');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-6">
            {/* Promo Code */}
            <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Bạn có mã giảm giá?
                </label>
                <input
                    type="text"
                    placeholder="Nhập mã"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b">
                <div className="flex items-center gap-2">
                    <span className="text-gray-700">Tạm tính</span>
                    <span className="text-gray-400 cursor-help" title="Tổng giá trị sản phẩm">ⓘ</span>
                </div>
                <span className="font-semibold text-gray-900">
                    {choosedItems.reduce((total, item) =>
                        total + (item.ciProductVariant.prodvPrice.ppPrice * item.ciQuantity), 0
                    ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b">
                <div className="flex items-center gap-2">
                    <span className="text-gray-700">Giảm giá</span>
                    <span className="text-gray-400 cursor-help" title="Giảm giá ước tính">ⓘ</span>
                </div>
                <span className="font-semibold text-gray-900">
                    {(0).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                <span className="text-2xl font-bold text-gray-900">
                    {(choosedItems.reduce((total, item) =>
                        total + (item.ciProductVariant.prodvPrice.ppPrice * item.ciQuantity), 0
                    )).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            </div>

            {/* Checkout Button */}
            <button
                disabled={choosedItems.length === 0}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 active:scale-95 transition-all duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 mb-3"
                onClick={handleCheckout}
            >
                Thanh toán {choosedItems.length > 0 && `(${choosedItems.length})`}
            </button>

            {/* Continue Shopping Button - Mobile */}
            <button
                onClick={() => router.push('/')}
                className="w-full sm:hidden flex items-center justify-center gap-2 py-3 border-2 border-gray-800 text-gray-800 rounded-lg font-semibold hover:bg-gray-800 hover:text-white active:scale-95 transition-all duration-150"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Tiếp tục mua sắm</span>
            </button>
        </div>
    )
}

export default CartSummary
