"use client"

import React, { useState } from 'react'
import { ProductListProvider, useProductList } from '@/context/ProductListContext'
import { useProducts } from '@/context/ProductsContext'
import FilterSidebar from '@/pages/ProductListPage/components/FilterSidebar'
import SortDropdown from '@/pages/ProductListPage/components/SortDropdown'
import ProductGrid from '@/pages/ProductListPage/components/ProductGrid'
import Pagination from '@/pages/ProductListPage/components/Pagination'
import { Filter } from 'lucide-react'

const ProductListContent = () => {
  const { paginatedProducts, totalFilteredItems } = useProductList()
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto md:px-20">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Điện thoại di động</h1>
          <p className="text-gray-600">
            Hiển thị {totalFilteredItems} sản phẩm
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Mở bộ lọc"
          >
            <Filter className="w-5 h-5" />
            <span>Bộ lọc</span>
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <FilterSidebar />

          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <FilterSidebar
              isMobile
              onClose={() => setShowMobileFilters(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                <SortDropdown />
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={paginatedProducts} />

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProductListPage = () => {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Có lỗi xảy ra</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <ProductListProvider products={products}>
      <ProductListContent />
    </ProductListProvider>
  )
}