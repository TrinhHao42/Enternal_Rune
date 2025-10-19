import { Product } from '@/types/Product';
import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

function formatPrice(price: number) {
    return price.toLocaleString("vi-VN") + "đ"
}

export default function ProductCard({product}: {product: Product}) {
    const originalPrice = product.prodOriginalPrice || (product.prodPrice ? product.prodPrice * 1.15 : 0);

    return (
        <div className="cursor-pointer w-full max-w-75 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ borderRadius: '8px', border: '1px solid rgba(225, 225, 225, 0.40)' }}>
            {/* Image Container */}
            <div className="relative p-4">
                <Image
                    src={product.prodImgUrl[0] || "/images/iphone.png"}
                    alt={product.prodName}
                    className="mx-auto w-40 h-40 object-contain rounded-2xl"
                    width={160}
                    height={160}
                />

                {/* Decorative icons */}
                <div className="absolute top-3 left-3 flex items-center gap-1">
                    <div className="relative">
                        <Star className="w-5 h-5 text-blue-500 fill-blue-500" />
                        <Star className="w-3 h-3 text-blue-400 fill-blue-400 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h2 className="text-[16px] font-semibold leading-[24px] text-[#000] mb-1">
                    {product.prodName}
                </h2>

                <p className="text-gray-500 text-sm mb-2 leading-5">{product.prodModel}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4].map((i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300 fill-gray-300" />
                    </div>
                    <span className="text-gray-500 text-xs">({product.prodRating})</span>
                </div>

                {/* Price */}
                <div className="flex items-end justify-between">
                    <div>
                        <div className="text-base font-semibold text-gray-900 leading-6 mb-0.5">
                            {formatPrice(product.prodPrice || 0)}
                        </div>
                        <div className="text-gray-400 line-through text-xs">
                            {formatPrice(originalPrice)}
                        </div>
                    </div>

                    {/* Cart Button */}
                    <button className="p-2 rounded-full flex items-center gap-2.5 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110" style={{ backgroundColor: '#DC2626' }}>
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}