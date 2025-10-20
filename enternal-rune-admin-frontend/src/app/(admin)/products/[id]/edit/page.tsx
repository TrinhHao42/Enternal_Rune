import type { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chỉnh sửa sản phẩm | Admin Dashboard",
  description: "Chỉnh sửa thông tin sản phẩm",
};

function getProductById(id: string) {
  return {
    id: id,
    name: "Bàn phím cơ Keychron K2",
    sku: "KEY-K2-001",
    category: "Phụ kiện",
    price: 2490000,
    costPrice: 1800000,
    stock: 45,
    lowStockThreshold: 10,
    status: "in-stock" as const,
    description: "Bàn phím cơ không dây cao cấp với switch Gateron",
    shortDescription: "Bàn phím cơ không dây Keychron K2",
    tags: ["keyboard", "mechanical", "wireless"],
    weight: 0.8,
    dimensions: "35.9 x 12.7 x 3.4 cm",
    images: ["/images/product/product-01.png"],
  };
}

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <h1 className="text-title-md font-bold text-gray-800 dark:text-white/90">
              Chỉnh sửa sản phẩm
            </h1>
          </div>
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            Cập nhật thông tin sản phẩm #{product.sku}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Thông tin cơ bản
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tên sản phẩm <span className="text-error-600">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={product.name}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SKU <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={product.sku}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="VD: PROD-001"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Danh mục <span className="text-error-600">*</span>
                  </label>
                  <select
                    defaultValue={product.category}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Điện thoại">Điện thoại</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Phụ kiện">Phụ kiện</option>
                    <option value="Âm thanh">Âm thanh</option>
                    <option value="Đồng hồ">Đồng hồ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mô tả ngắn
                </label>
                <input
                  type="text"
                  defaultValue={product.shortDescription}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Mô tả ngắn gọn về sản phẩm"
                />
              </div>

              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mô tả chi tiết
                </label>
                <textarea
                  rows={4}
                  defaultValue={product.description}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Nhập mô tả chi tiết về sản phẩm"
                />
              </div>

              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  defaultValue={product.tags.join(", ")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Nhập tags, cách nhau bởi dấu phẩy"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Giá & Tồn kho
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Giá bán <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={product.price}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Giá vốn
                  </label>
                  <input
                    type="number"
                    defaultValue={product.costPrice}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Số lượng tồn kho <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={product.stock}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cảnh báo tồn kho thấp
                  </label>
                  <input
                    type="number"
                    defaultValue={product.lowStockThreshold}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Vận chuyển
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cân nặng (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={product.weight}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kích thước (D x R x C cm)
                  </label>
                  <input
                    type="text"
                    defaultValue={product.dimensions}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="0 x 0 x 0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Hình ảnh sản phẩm
            </h3>
            
            {/* Current Images */}
            <div className="mb-4">
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hình ảnh hiện tại
              </label>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1.5 bg-error-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Xóa ảnh"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload New Images */}
            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thêm hình ảnh mới
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center dark:border-gray-700">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-theme-sm text-gray-600 dark:text-gray-400">
                  Kéo thả ảnh vào đây hoặc{" "}
                  <button type="button" className="text-brand-600 hover:text-brand-700">
                    chọn file
                  </button>
                </p>
                <p className="text-theme-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG, GIF tới 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              Trạng thái
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="in-stock"
                  defaultChecked={product.status === "in-stock"}
                  className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-theme-sm text-gray-700 dark:text-gray-300">
                  Còn hàng
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="out-of-stock"
                  defaultChecked={product.status === "out-of-stock"}
                  className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-theme-sm text-gray-700 dark:text-gray-300">
                  Hết hàng
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="discontinued"
                  defaultChecked={product.status === "discontinued"}
                  className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-theme-sm text-gray-700 dark:text-gray-300">
                  Ngừng kinh doanh
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="space-y-3">
              <button className="w-full px-4 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium text-theme-sm">
                Lưu thay đổi
              </button>
              <Link
                href="/products"
                className="block w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-theme-sm text-center dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Hủy
              </Link>
              <button
                type="button"
                className="w-full px-4 py-2.5 bg-error-50 text-error-600 rounded-lg hover:bg-error-100 font-medium text-theme-sm dark:bg-error-900/20 dark:hover:bg-error-900/30"
              >
                Xóa sản phẩm
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              Thông tin
            </h3>
            <div className="space-y-3 text-theme-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">ID:</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  #{product.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tạo lúc:</span>
                <span className="text-gray-800 dark:text-gray-200">
                  10/10/2024
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Cập nhật:</span>
                <span className="text-gray-800 dark:text-gray-200">
                  19/10/2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
