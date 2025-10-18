"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "@/types/Product"
import { ProductPrice } from "@/types/ProductPrice"

type ProductsContextType = {
    products: Product[]
    loading: boolean
    error: string | null
    refetch: () => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = async () => {
        setLoading(true)
        setError(null)

        try {
            // Gọi song song cả 2 API
            const [productsRes, pricesRes] = await Promise.all([
                fetch("http://localhost:3001/products"),
                fetch("http://localhost:3001/product_prices"),
            ])

            if (!productsRes.ok || !pricesRes.ok) {
                throw new Error("Không thể tải dữ liệu sản phẩm hoặc giá.")
            }

            const [productsData, pricesData]: [Product[], ProductPrice[]] = await Promise.all([
                productsRes.json(),
                pricesRes.json(),
            ])

            // Tạo Map giá theo productId để tìm nhanh
            const priceMap = new Map<number, ProductPrice>(
                pricesData.map((p) => [p.ppProduct, p])
            )

            // Merge dữ liệu sản phẩm với giá
            const mergedProducts: Product[] = productsData.map((prod) => {
                const priceInfo = priceMap.get(prod.prodId)
                const activePrice = priceInfo?.ppPriceStatus === "ACTIVE" ? priceInfo.ppPrice : 0

                return {
                    ...prod,
                    prodPrice: activePrice,
                    prodOriginalPrice: activePrice ? activePrice * 1.15 : 0, // Giá gốc (tăng 15%)
                }
            })

            setProducts(mergedProducts)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Lỗi không xác định khi tải dữ liệu"
            console.error("Error fetching products:", message)
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <ProductsContext.Provider value={{ products, loading, error, refetch: fetchProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}

// Custom hook
export const useProducts = (): ProductsContextType => {
    const context = useContext(ProductsContext)
    if (!context) throw new Error("useProducts phải được sử dụng trong ProductsProvider")
    return context
}

export default ProductsContext
