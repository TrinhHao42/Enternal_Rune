import type { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thêm sản phẩm mới | Admin Dashboard",
  description: "Thêm sản phẩm mới vào hệ thống",
};

export default function NewProductPage() {
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
              Thêm sản phẩm mới
            </h1>
          </div>
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            Điền thông tin để thêm sản phẩm mới vào hệ thống
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Thông tin cơ bản
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mô tả ngắn
                </label>
                <textarea
                  rows={3}
                  placeholder="Nhập mô tả ngắn về sản phẩm"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mô tả chi tiết
                </label>
                <textarea
                  rows={6}
                  placeholder="Nhập mô tả chi tiết về sản phẩm"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Giá và tồn kho
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Giá bán *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-8 text-theme-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Giá gốc
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-8 text-theme-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  SKU *
                </label>
                <input
                  type="text"
                  placeholder="PRD-001"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Số lượng tồn kho *
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Hình ảnh sản phẩm
            </h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-2 text-theme-sm text-gray-600 dark:text-gray-400">
                Kéo và thả hình ảnh hoặc{" "}
                <span className="text-brand-600 dark:text-brand-400 cursor-pointer">
                  chọn file
                </span>
              </p>
              <p className="text-theme-xs text-gray-500 dark:text-gray-500 mt-1">
                PNG, JPG, GIF lên đến 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Trạng thái
            </h3>
            <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <option>Đang bán</option>
              <option>Tạm ngưng</option>
              <option>Hết hàng</option>
            </select>
          </div>

          {/* Category */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Danh mục
            </h3>
            <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <option>Chọn danh mục</option>
              <option>Laptop</option>
              <option>Smartphone</option>
              <option>Tablet</option>
              <option>Accessories</option>
              <option>Watch</option>
            </select>
          </div>

          {/* Actions */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="space-y-3">
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Lưu sản phẩm
              </button>
              <Link
                href="/products"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
              >
                Hủy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
