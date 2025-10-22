import type { Metadata } from "next";
import React from "react";
import { ReviewMetrics, ReviewTable } from "@/components/reviews";

export const metadata: Metadata = {
  title: "Đánh giá & Phản hồi | Admin Dashboard",
  description: "Quản lý đánh giá và phản hồi khách hàng",
};

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-title-md font-bold text-gray-800 dark:text-white/90">
          Đánh giá & Phản hồi
        </h1>
        <p className="text-theme-sm text-gray-500 dark:text-gray-400">
          Theo dõi và phản hồi đánh giá của khách hàng
        </p>
      </div>

      {/* Metrics */}
      <ReviewMetrics />

      {/* Reviews */}
      <ReviewTable />
    </div>
  );
}
