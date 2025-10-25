/**
 * FilterSidebar.tsx
 * Sidebar with all filter options for products
 */

"use client"

import React, { useState } from 'react'
import FilterGroup, { FilterOption } from './FilterGroup'
import { useProductList } from '@/context/ProductListContext'
import { X } from 'lucide-react'

interface FilterSidebarProps {
  onClose?: () => void
  isMobile?: boolean
}

export default function FilterSidebar({ onClose, isMobile = false }: FilterSidebarProps) {
  const { filters, setFilters } = useProductList()

  // Local state for pending changes
  const [localFilters, setLocalFilters] = useState(filters)

  // Brand options
  const brandOptions: FilterOption[] = [
    { value: 9, label: 'Samsung', type: 'checkbox' },
    { value: 1, label: 'Apple', type: 'checkbox' },
    { value: 2, label: 'Xiaomi', type: 'checkbox' },
    { value: 3, label: 'OPPO', type: 'checkbox' },
    { value: 4, label: 'Vivo', type: 'checkbox' }
  ]

  // Price range options
  const priceOptions: FilterOption[] = [
    { value: 'under-5m', label: 'Dưới 5 triệu', type: 'checkbox' },
    { value: '5m-10m', label: '5 - 10 triệu', type: 'checkbox' },
    { value: '10m-15m', label: '10 - 15 triệu', type: 'checkbox' },
    { value: '15m-20m', label: '15 - 20 triệu', type: 'checkbox' },
    { value: 'over-20m', label: 'Trên 20 triệu', type: 'checkbox' }
  ]

  // Memory options
  const memoryOptions: FilterOption[] = [
    { value: '64 GB', label: '64 GB', type: 'checkbox' },
    { value: '128 GB', label: '128 GB', type: 'checkbox' },
    { value: '256 GB', label: '256 GB', type: 'checkbox' },
    { value: '512 GB', label: '512 GB', type: 'checkbox' },
    { value: '1 TB', label: '1 TB', type: 'checkbox' }
  ]

  // Color options
  const colorOptions: FilterOption[] = [
    { value: 'Đen', label: 'Đen', type: 'checkbox' },
    { value: 'Trắng', label: 'Trắng', type: 'checkbox' },
    { value: 'Xanh', label: 'Xanh', type: 'checkbox' },
    { value: 'Đỏ', label: 'Đỏ', type: 'checkbox' },
    { value: 'Vàng', label: 'Vàng', type: 'checkbox' },
    { value: 'Tím', label: 'Tím', type: 'checkbox' }
  ]

  // Handle filter changes
  const handleBrandChange = (value: string | number, checked: boolean) => {
    const numValue = Number(value)
    setLocalFilters(prev => ({
      ...prev,
      brands: checked
        ? [...prev.brands, numValue]
        : prev.brands.filter(b => b !== numValue)
    }))
  }

  const handlePriceChange = (value: string | number, checked: boolean) => {
    const strValue = String(value)
    setLocalFilters(prev => ({
      ...prev,
      priceRanges: checked
        ? [...prev.priceRanges, strValue]
        : prev.priceRanges.filter(p => p !== strValue)
    }))
  }

  const handleMemoryChange = (value: string | number, checked: boolean) => {
    const strValue = String(value)
    setLocalFilters(prev => ({
      ...prev,
      memory: checked
        ? [...prev.memory, strValue]
        : prev.memory.filter(m => m !== strValue)
    }))
  }

  const handleColorChange = (value: string | number, checked: boolean) => {
    const strValue = String(value)
    setLocalFilters(prev => ({
      ...prev,
      colors: checked
        ? [...prev.colors, strValue]
        : prev.colors.filter(c => c !== strValue)
    }))
  }

  // Apply filters
  const handleApplyFilters = () => {
    setFilters(localFilters)
    if (isMobile && onClose) {
      onClose()
    }
  }

  // Reset filters
  const handleResetFilters = () => {
    const resetFilters = {
      brands: [],
      priceRanges: [],
      features: [],
      memory: [],
      colors: [],
      inStock: null
    }
    setLocalFilters(resetFilters)
    setFilters(resetFilters)
  }

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Bộ lọc</h2>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Đóng bộ lọc"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="p-4 overflow-y-auto flex-1">
        <FilterGroup
          title="Thương hiệu"
          options={brandOptions}
          selectedValues={localFilters.brands}
          onChange={handleBrandChange}
          collapsible
        />

        <FilterGroup
          title="Mức giá"
          options={priceOptions}
          selectedValues={localFilters.priceRanges}
          onChange={handlePriceChange}
          collapsible
        />

        <FilterGroup
          title="Bộ nhớ trong"
          options={memoryOptions}
          selectedValues={localFilters.memory}
          onChange={handleMemoryChange}
          collapsible
        />

        <FilterGroup
          title="Màu sắc"
          options={colorOptions}
          selectedValues={localFilters.colors}
          onChange={handleColorChange}
          collapsible
        />
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          aria-label="Áp dụng bộ lọc"
        >
          Áp dụng
        </button>
        <button
          onClick={handleResetFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
          aria-label="Xóa bộ lọc"
        >
          Xóa bộ lọc
        </button>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white flex flex-col">
          {sidebarContent}
        </div>
      </div>
    )
  }

  return (
    <aside className="hidden lg:flex w-64 bg-white rounded-2xl border border-gray-200 sticky top-4 h-fit max-h-[calc(100vh-2rem)] flex-col">
      {sidebarContent}
    </aside>
  )
}
