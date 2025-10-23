"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "@/types/Product"

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
            // Fetch products from db.json which already includes prices
            const productsRes = await fetch("http://localhost:3001/products")

            if (!productsRes.ok) {
                throw new Error("Không thể tải dữ liệu sản phẩm.")
            }

            const productsData: Product[] = await productsRes.json()

            // Products already have prodPrice from db.json, just calculate original price
            const processedProducts: Product[] = productsData.map((prod) => ({
                ...prod,
                prodOriginalPrice: prod.prodPrice ? prod.prodPrice * 1.15 : 0, // Giá gốc (tăng 15%)
            }))

            setProducts(processedProducts)
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
