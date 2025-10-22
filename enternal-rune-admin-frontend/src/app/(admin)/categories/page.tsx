import type { Metadata } from "next";
import React from "react";
import { CategoryMetrics, CategoryTable } from "@/components/categories";

export const metadata: Metadata = {
  title: "Danh mục sản phẩm | Admin Dashboard",
  description: "Quản lý danh mục sản phẩm",
};

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-title-md font-bold text-gray-800 dark:text-white/90">
          Danh mục sản phẩm
        </h1>
        <p className="text-theme-sm text-gray-500 dark:text-gray-400">
          Quản lý và tổ chức danh mục theo cấu trúc phân cấp
        </p>
      </div>

      {/* Metrics */}
      <CategoryMetrics />

      {/* Table */}
      <CategoryTable />
    </div>
  );
}
