import React from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartItem } from '@/types/CartItem'

interface CartItemListProps {
    item: CartItem;
    isSelected: boolean;
    onToggle: (item: CartItem) => void;
}

const CartItemList = ({ item, isSelected, onToggle }: CartItemListProps) => {
    return (
        <div 
            className={`relative flex items-start gap-3 p-4 border-b last:border-b-0 transition-colors duration-150 ${isSelected ? 'bg-blue-50' : ''}`}
        >
            {/* Blue left border when selected */}
            {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
            )}
            
            {/* Image */}
            <Image
                alt={item.ciProductVariant.prodvImage.imgName}
                src={item.ciProductVariant.prodvImage.imgData}
                width={100}
                height={100}
                className="rounded-md object-cover border border-gray-200 w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0"
            />
            
            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 line-clamp-2">
                            {item.ciProductVariant.prodvName}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-500">
                            Còn hàng
                        </p>
                    </div>
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggle(item)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                    />
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
                        <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
                        </svg>
                        Đổi trả miễn phí 30 ngày
                    </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
                        </svg>
                        Miễn phí vận chuyển
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-2 py-1">
                        <button className="p-0.5 hover:text-blue-500 rounded transition cursor-pointer active:scale-95">
                            <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="text-xs font-medium text-gray-900 min-w-[16px] text-center">
                            {item.ciQuantity}
                        </span>
                        <button className="p-0.5 hover:text-blue-500 rounded transition cursor-pointer active:scale-95">
                            <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-gray-900">
                            {item.ciProductVariant.prodvPrice.ppPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                        <button className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-150 active:scale-95 p-0.5">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItemList
