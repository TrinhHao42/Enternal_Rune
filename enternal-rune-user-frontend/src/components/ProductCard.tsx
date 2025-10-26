import { formatPrice } from '@/lib/format';
import { Product } from '@/types/Product';
import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default function ProductCard({ product }: { product: Product }) {
    const originalPrice = product.prodOriginalPrice || (product.prodPrice ? product.prodPrice * 1.15 : 0);

    return (
        <Link href={`/products/${product.id}`} className="block">
            <div className="group cursor-pointer w-full bg-white overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500">
            {/* Image Container */}
            <div className="relative p-4 bg-gradient-to-br from-blue-50 to-white group-hover:from-blue-100 group-hover:to-blue-50 transition-colors duration-300">
                <Image
                    src={product.prodImg[0].imgData || "/images/iphone.png"}
                    alt={product.prodName}
                    className="mx-auto w-32 h-32 object-contain rounded-2xl group-hover:scale-110 transition-transform duration-500"
                    width={128}
                    height={128}
                />

                {/* New/Hot Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    NEW
                </div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50">
                    <Star className="w-4 h-4 text-gray-400 hover:text-red-500 hover:fill-red-500 transition-colors" />
                </button>

                {/* Quick View */}
                <div className="absolute inset-x-4 bottom-4 bg-white/90 backdrop-blur-sm rounded-xl p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <p className="text-xs text-center text-gray-600 font-medium">Nhấn để xem chi tiết</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h2 className="flex flex-col justify-center text-base font-bold text-gray-900 mb-2 h-12 line-clamp-2 overflow-hidden text-ellipsis group-hover:text-blue-600 transition-colors leading-6">
                    {product.prodName}
                </h2>
                <p className="text-gray-500 text-sm mb-2 capitalize h-5 w-[90%] line-clamp-1 overflow-hidden text-ellipsis">
                    {product.prodDescription}
                </p>
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i <= Math.floor(product.prodRating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : i - product.prodRating < 1 && i > product.prodRating
                                        ? 'text-yellow-400 fill-yellow-200/50'
                                        : 'text-gray-200 fill-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm">({product.prodRating.toFixed(1)})</span>
                    <div className="ml-auto">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            {formatPrice(product.prodPrice || 0)}
                        </div>
                        <div className="text-gray-400 line-through text-sm">
                            {formatPrice(originalPrice)}
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-xs text-gray-500">Tiết kiệm</div>
                        <div className="text-sm font-semibold text-red-500">
                            {Math.round(((originalPrice - (product.prodPrice || 0)) / originalPrice) * 100)}%
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group/btn">
                        <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span>Mua ngay</span>
                    </button>

                    <button className="bg-blue-50 text-blue-600 py-2 px-3 rounded-xl font-semibold text-sm hover:bg-blue-100 transition-all duration-300 border border-blue-200 hover:border-blue-300">
                        So sánh
                    </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Miễn phí giao hàng</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Bảo hành 12 tháng</span>
                </div>
            </div>
        </div>
        </Link>
    );
}