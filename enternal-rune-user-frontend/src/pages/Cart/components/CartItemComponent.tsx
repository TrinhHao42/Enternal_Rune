import React from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartItem } from '@/types/CartItem'

interface CartItemComponentProps {
    item: CartItem;
    isSelected: boolean;
    onToggle: (item: CartItem) => void;
}

const CartItemComponent = ({ item, isSelected, onToggle }: CartItemComponentProps) => {
    return (
        <div
            key={item.ciId}
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-150 ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(item)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0 mt-1 sm:mt-0"
            />

            <Image alt={item.ciProductVariant.prodvImage.imageName} src={item.ciProductVariant.prodvImage.imageData} width={100} height={100} className="rounded-lg object-cover border border-gray-200 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
            <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                            {item.ciProductVariant.prodvName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            Màu: {item.ciProductVariant.prodvColor}
                        </p>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer duration-150 active:scale-95 sm:hidden">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex items-center justify-between sm:justify-start gap-4">
                    <div className="flex items-center gap-3">
                        <button className="p-1.5 border border-gray-300 rounded-md active:scale-95 transition cursor-pointer hover:border-blue-500 hover:text-blue-500">
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-gray-900 font-medium w-8 text-center">
                            {item.ciQuantity}
                        </span>
                        <button className="p-1.5 border border-gray-300 rounded-md active:scale-95 transition cursor-pointer hover:border-blue-500 hover:text-blue-500">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                        {item.ciProductVariant.prodvPrice.ppPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND", })} </p> </div> </div> <button className="hidden sm:block text-gray-400 hover:text-red-500 transition-colors duration-150 active:scale-95">
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    )
}

export default CartItemComponent
