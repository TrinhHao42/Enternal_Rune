'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ProductImageGallery from '@/pages/ProductDetail/ProductImageGallery'
import ProductInfoPanel from '@/pages/ProductDetail/ProductInfoPanel'
import SpecificationsSection from '@/pages/ProductDetail/SpecificationsSection'
import { Product } from '@/types/Product'
import { useProducts } from '@/context/ProductsContext'
import { renderBestSellers } from '../Home/components/ProductList'

export default function ProductDetail() {
  const params = useParams()
  const { products, loading, error } = useProducts()
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    if (params?.id && products.length > 0) {
      // Convert ID to string for comparison since our Product type uses string ID
      const productId = params.id as string
      const foundProduct = products.find(p => String(p.prodId) === productId)
      setProduct(foundProduct)
    }
  }, [params?.id, products])


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

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-600 mb-8">{error || 'Sản phẩm không tồn tại'}</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images?.map(img => img.imageData) || ['/images/iphone.png']
  
  // Chuyển đổi prodSpecs từ product sang định dạng phù hợp cho SpecificationsSection
  const getSpecificationsForDisplay = (prodSpecs?: { [key: string]: string | number | boolean }) => {
    if (!prodSpecs) return {}
    
    // Chuyển đổi các key thành tên hiển thị tiếng Việt và đảm bảo values là string
    const displayMap: { [key: string]: string } = {
      screenSize: 'Kích thước màn hình',
      displayTech: 'Công nghệ màn hình', 
      resolution: 'Độ phân giải',
      displayFeatures: 'Tính năng màn hình',
      rearCamera: 'Camera sau',
      frontCamera: 'Camera trước',
      chipset: 'Chipset',
      cpuType: 'Loại CPU',
      ram: 'RAM',
      storage: 'Bộ nhớ trong',
      battery: 'Pin',
      os: 'Hệ điều hành',
      th_sim: 'SIM',
      nfcTech: 'Công nghệ NFC',
      cm_bin: 'Cảm Biến'
    }
    
    const specifications: Record<string, string> = {}
    
    Object.entries(prodSpecs).forEach(([key, value]) => {
      const displayKey = displayMap[key] || key
      const displayValue = String(value)
      specifications[displayKey] = displayValue
    })
    
    return specifications
  }

  const specifications = getSpecificationsForDisplay(product.prodSpecs)

  return (
    <div className="container mx-auto px-20 py-6">
      <div className="container mx-auto py-2">
        <nav className="text-sm breadcrumbs">
          <ul className="flex items-center space-x-2 text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Trang chủ</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/products" className="hover:text-blue-600">Sản phẩm</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-800">{product.prodName}</li>
          </ul>
        </nav>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 pt-2 pb-6">
        <ProductImageGallery
          images={images}
          product={product}
        />
        <ProductInfoPanel
          product={product}
        />
      </div>
      {/* Hiển thị thông số kỹ thuật */}
      {product.prodSpecs && Object.keys(product.prodSpecs).length > 0 ? (
        <SpecificationsSection specifications={specifications} />
      ) : (
        <div className="w-full bg-gray-50 rounded-2xl p-8 text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="text-gray-500 mt-4">Đang tải thông tin sản phẩm...</p>
        </div>
      )}
      
      {renderBestSellers(products, true)}
    </div>
  )
}