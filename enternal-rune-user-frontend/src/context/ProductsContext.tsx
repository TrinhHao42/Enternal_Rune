"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "@/types/Product"
import AxiosInstance from "@/configs/AxiosInstance"

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
            const productsRes = await AxiosInstance.get("/products/top-brand")
            if (!productsRes || productsRes.status !== 200) {
                throw new Error("Không thể tải dữ liệu sản phẩm.")
            }
            setProducts(productsRes.data)
        } catch (err) {
            console.error("Error fetching products:", err)
            setError(err instanceof Error ? err.message : "Lỗi không xác định khi tải dữ liệu")
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
