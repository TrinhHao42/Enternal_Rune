'use client'
import styles from '../Cart.module.scss'
import { useCart } from '@/context/CartContext'
import { TriangleAlert, Loader2, ArrowBigLeft } from "lucide-react"
import { Cart } from '@/lib/icons'
import CartItemComponent from './CartItemComponent'
import CartSummary from './CartSummary'
import { useState, useCallback } from 'react'
import { CartItem } from '@/types/CartItem'
import { useRouter } from 'next/navigation'

const CartItemList = () => {
    const router = useRouter();
    const { cartItems, loading, error } = useCart();
    const [choosedItems, setChoosedItems] = useState<CartItem[]>([]);

    const handleToggleItem = useCallback((item: CartItem) => {
        setChoosedItems((prev) => {
            const isSelected = prev.some(i => i.ciId === item.ciId);
            if (isSelected) {
                return prev.filter(i => i.ciId !== item.ciId);
            } else {
                return [...prev, item];
            }
        });
    }, []);

    const handleSelectAll = useCallback(() => {
        if (choosedItems.length === cartItems.length) {
            setChoosedItems([]);
        } else {
            setChoosedItems([...cartItems]);
        }
    }, [cartItems, choosedItems.length]);

    const isItemSelected = useCallback((item: CartItem) => {
        return choosedItems.some(i => i.ciId === item.ciId);
    }, [choosedItems]);

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

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 animate-fadeIn">
                    <div className="px-8 py-10 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Giỏ hàng của bạn đang trống <Cart className="inline-block h-0.5 w-0.5" />
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Có vẻ như bạn chưa thêm sản phẩm nào. Hãy khám phá ngay!
                        </p>
                        <button
                            className="inline-flex items-center gap-2 rounded-lg active:scale-95 transition-transform duration-150 cursor-pointer"
                            onClick={() => router.push('/')}
                        >
                            <ArrowBigLeft className="w-5 h-5" />
                            <span>Tiếp tục mua sắm</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col lg:flex-row gap-8 w-[90%] md:w-[85%] lg:w-[80%] py-6 mx-auto'>
                    {/* Khung bên trái - Danh sách sản phẩm */}
                    <div className='flex-1'>
                        <button
                            onClick={() => router.push('/')}
                            className="hidden sm:inline-flex items-center gap-2 active:scale-95 transition-all duration-150"
                        >
                            <ArrowBigLeft className="w-5 h-5" />
                            <span>Tiếp tục mua sắm</span>
                        </button>


                        {/* Checkbox Chọn tất cả */}
                        <div className="flex items-center gap-3 mb-4 p-4">
                            <input
                                type="checkbox"
                                id="select-all"
                                checked={choosedItems.length === cartItems.length && cartItems.length > 0}
                                onChange={handleSelectAll}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor="select-all" className="text-sm sm:text-base font-medium text-gray-700 cursor-pointer select-none">
                                Chọn tất cả ({choosedItems.length}/{cartItems.length})
                            </label>
                        </div>

                        {cartItems.map((item) => (
                            <CartItemComponent
                                key={item.ciId}
                                item={item}
                                isSelected={isItemSelected(item)}
                                onToggle={handleToggleItem}
                            />
                        ))}
                    </div>

                    {/* Khung bên phải - Tổng kết đơn hàng */}
                    <div className='w-full lg:w-96'>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Tóm tắt</h2>
                        <CartSummary choosedItems={choosedItems} />
                    </div>
                </div>
            )}
        </>
    )
}

export default CartItemList
