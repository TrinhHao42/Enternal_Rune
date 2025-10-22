"use client"
import ProductCard from "./ProductCard"
import { FaArrowRight } from "react-icons/fa6";
import { useProducts } from "@/context/ProductsContext";
import { Product } from "@/types/Product";


export const renderBestSellers = (products: Product[], hideButton = false) => {
    return (
        <div className="py-6">
            <div className="flex justify-between items-center pb-6">
                <h2 className="text-2xl font-semibold">{hideButton ? 'Sản phẩm có liên quan' : 'Sản phẩm mới'}</h2>
                {!hideButton && (
                    <p className="flex gap-2 items-center justify-between group cursor-pointer">
                        Xem tất cả <FaArrowRight className="group-hover:translate-x-1 transition-all" />
                    </p>
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {products.slice(8, 12).map((product) => (
                    <ProductCard key={product.prodId} product={product} />
                ))}
            </div>

            {hideButton && (
                <button className="mt-8 mx-auto bg-white text-black flex h-[42px] px-5 py-[10px] justify-center items-center gap-[10px] rounded-lg border border-[#565656] transition-all hover:bg-gray-100 hover:shadow-md hover:border-gray-400">
                    Xem thêm
                </button>
            )}
        </div>
    );
};


export default function ProductList() {
    const { products, loading, error } = useProducts();

    if (loading) {
        return <div className="text-center py-8">Đang tải sản phẩm...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Lỗi: {error}</div>;
    }

    if (products.length === 0) {
        return <div className="text-center py-8">Không có sản phẩm</div>;
    }

    return (
        <>
            <h2 className="mb-4 text-2xl font-semibold">Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product) => (
                    <ProductCard key={product.prodId} product={product} />
                ))}
            </div>
            <button className="mt-8 mx-auto bg-white text-black flex h-[42px] px-5 py-[10px] justify-center items-center gap-[10px] rounded-lg border border-[#565656] transition-all hover:bg-gray-100 hover:shadow-md hover:border-gray-400">
                Xem thêm
            </button>
            {renderBestSellers(products, false)}
        </>
    )
}
