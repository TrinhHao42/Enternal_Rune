/**
 * ProductListContext.tsx
 * Context provider for product list page - manages products, filters, sorting, and pagination
 */

"use client"

import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react'
import { Product } from '@/types/Product'

// Filter state interface
export interface FilterState {
  brands: number[]
  priceRanges: string[]
  features: string[]
  memory: string[]
  colors: string[]
  inStock: boolean | null
}

// Sort options
export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest'

interface ProductListContextType {
  products: Product[]
  filteredProducts: Product[]
  paginatedProducts: Product[]
  filters: FilterState
  setFilters: (filters: FilterState) => void
  sortOption: SortOption
  setSortOption: (option: SortOption) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  itemsPerPage: number
  totalFilteredItems: number
}

const ProductListContext = createContext<ProductListContextType | undefined>(undefined)

interface ProductListProviderProps {
  children: ReactNode
  products: Product[]
}

export const ProductListProvider = ({ children, products }: ProductListProviderProps) => {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRanges: [],
    features: [],
    memory: [],
    colors: [],
    inStock: null
  })
  
  const [sortOption, setSortOption] = useState<SortOption>('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by brands
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.prodBrand || 0))
    }

    // Filter by price ranges
    if (filters.priceRanges.length > 0) {
      result = result.filter(p => {
        const price = p.prodPrice || 0
        return filters.priceRanges.some(range => {
          switch (range) {
            case 'under-5m':
              return price < 5000000
            case '5m-10m':
              return price >= 5000000 && price < 10000000
            case '10m-15m':
              return price >= 10000000 && price < 15000000
            case '15m-20m':
              return price >= 15000000 && price < 20000000
            case 'over-20m':
              return price >= 20000000
            default:
              return true
          }
        })
      })
    }

    // Filter by colors
    if (filters.colors.length > 0) {
      result = result.filter(p => 
        p.prodColor?.some(color => filters.colors.includes(color))
      )
    }

    // Filter by memory/storage
    if (filters.memory.length > 0) {
      result = result.filter(p => {
        const storage = String(p.prodSpecs?.storage || '')
        return filters.memory.some(mem => storage.includes(mem))
      })
    }

    // Filter by stock status
    if (filters.inStock !== null) {
      result = result.filter(p => p.prodStatus === 'ACTIVE')
    }

    return result
  }, [products, filters])

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => (a.prodPrice || 0) - (b.prodPrice || 0))
      case 'price-desc':
        return sorted.sort((a, b) => (b.prodPrice || 0) - (a.prodPrice || 0))
      case 'newest':
        return sorted.sort((a, b) => Number(b.id) - Number(a.id))
      case 'popular':
      default:
        return sorted.sort((a, b) => (b.prodRating || 0) - (a.prodRating || 0))
    }
  }, [filteredProducts, sortOption])

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedProducts.slice(startIndex, endIndex)
  }, [sortedProducts, currentPage, itemsPerPage])

  // Reset to page 1 when filters or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, sortOption])

  const value: ProductListContextType = {
    products,
    filteredProducts: sortedProducts,
    paginatedProducts,
    filters,
    setFilters,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    totalFilteredItems: sortedProducts.length
  }

  return (
    <ProductListContext.Provider value={value}>
      {children}
    </ProductListContext.Provider>
  )
}

// Custom hook
export const useProductList = (): ProductListContextType => {
  const context = useContext(ProductListContext)
  if (!context) {
    throw new Error('useProductList must be used within ProductListProvider')
  }
  return context
}
