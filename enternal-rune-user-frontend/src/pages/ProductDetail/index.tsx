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
      const foundProduct = products.find(p => p.prodId === parseInt(params.id as string))
      setProduct(foundProduct)
    }
  }, [params?.id, products])

  console.log(product);


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

  const images = product.prodImgUrl?.map(img => img.imageData) || ['/images/iphone.png']
  const specifications = {
    'Service Provider': 'Unlocked',
    'CPU Model': 'Snapdragon 8 Gen 3',
    'Front Camera': '12 MP',
    'RAM Memory': '12 GB',
    'Screen Size': '6.8 inches',
    'Weight': '218 g',
    'Storage': '512 GB',
    'Operating System': 'Android 14',
    'Battery': '5000 mAh',
    'Network': '5G',
    'Display Type': 'Dynamic AMOLED 2X',
    'Water Resistance': 'IP68'
  }

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
      <SpecificationsSection specifications={specifications} />
      {renderBestSellers(products, true)}
    </div>
  )
}