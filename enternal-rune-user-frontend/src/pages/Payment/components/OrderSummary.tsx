import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Tag } from 'lucide-react'

interface OrderItem {
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
}

interface OrderSummaryProps {
    items: OrderItem[];
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 0; // Free shipping
    const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% discount if coupon applied
    const tax = (subtotal - discount) * 0.08; // 8% tax
    const total = subtotal + shipping + tax - discount;

    const applyCoupon = () => {
        if (couponCode.trim()) {
            setAppliedCoupon(couponCode);
            setCouponCode('');
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm p-6 lg:sticky lg:top-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    Giỏ hàng của bạn
                    <span className="bg-blue-600 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full">
                        {items.length}
                    </span>
                </h3>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-600 hover:text-gray-900 transition lg:hidden"
                >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
            </div>

            {/* Items List */}
            <div className={`space-y-4 mb-6 pb-6 border-b ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <div className="relative">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover border border-gray-200"
                            />
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                                {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                            <p className="text-base font-bold text-gray-900 mt-1">
                                {item.price.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Coupon Section */}
            <div className={`mb-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                {!appliedCoupon ? (
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Tag className="w-4 h-4" />
                            Áp dụng mã giảm giá
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Nhập mã"
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                            />
                            <button
                                onClick={applyCoupon}
                                disabled={!couponCode.trim()}
                                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                            >
                                Áp dụng
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Mã "{appliedCoupon}" đã được áp dụng</span>
                        </div>
                        <button
                            onClick={removeCoupon}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                            Xóa
                        </button>
                    </div>
                )}
            </div>

            {/* Order Summary */}
            <div className={`space-y-3 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                <h4 className="font-semibold text-gray-900 mb-3">Tóm tắt đơn hàng</h4>
                
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                        Tạm tính
                        <span className="text-gray-400 cursor-help" title="Tổng giá trị sản phẩm">ⓘ</span>
                    </span>
                    <span className="font-semibold text-gray-900">
                        {subtotal.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                        Vận chuyển
                        <span className="text-gray-400 cursor-help" title="Phí vận chuyển">ⓘ</span>
                    </span>
                    <span className="font-semibold text-green-600">
                        Miễn phí
                    </span>
                </div>

                {/* Discount */}
                {appliedCoupon && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Giảm giá</span>
                        <span className="font-semibold text-green-600">
                            -{discount.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}
                        </span>
                    </div>
                )}

                {/* Tax */}
                <div className="flex items-center justify-between text-sm pb-3 border-b">
                    <span className="text-gray-600 flex items-center gap-1">
                        Thuế (8%)
                        <span className="text-gray-400 cursor-help" title="Thuế VAT">ⓘ</span>
                    </span>
                    <span className="font-semibold text-gray-900">
                        {tax.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-3">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-2xl font-bold text-blue-600">
                        {total.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </span>
                </div>
            </div>

            {/* Security Badge */}
            <div className={`mt-6 pt-6 border-t text-center ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Thanh toán an toàn & bảo mật</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
