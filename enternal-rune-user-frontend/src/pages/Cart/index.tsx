'use client'
import { useCallback, useState } from 'react'
import styles from './Cart.module.scss'
import { useCart } from '@/context/CartContext'
import { TriangleAlert, Loader2, ArrowBigLeft } from "lucide-react"
import { Cart as CartIcon } from '@/lib/icons'
import { useRouter } from 'next/navigation'
import { CartItem } from '@/types/CartItem'
import CartItemList from './components/CartItemList'
import CartSummary from './components/CartSummary'

const Cart = () => {
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
              Giỏ hàng của bạn đang trống <CartIcon className="inline-block h-5 w-5" />
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
        <div className='flex flex-col lg:flex-row gap-5 max-w-[1400px] w-full px-4 sm:px-6 lg:px-8 py-6 mx-auto'>
          <div className='flex-[2]'>
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 cursor-pointer active:scale-95 transition-all"
              >
                <ArrowBigLeft className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Tiếp tục mua sắm</span>
              </button>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={choosedItems.length === cartItems.length && cartItems.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="select-all" className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer select-none">
                  Chọn tất cả ({choosedItems.length}/{cartItems.length})
                </label>
              </div>
            </div>
            {cartItems.map((item) => (
              <CartItemList
                key={item.ciId}
                item={item}
                isSelected={isItemSelected(item)}
                onToggle={handleToggleItem}
              />
            ))}
          </div>

          <div className='flex-[1] lg:max-w-[380px]'>
            <CartSummary choosedItems={choosedItems} />
          </div>
        </div>
      )}
    </>
  );
}

export default Cart
