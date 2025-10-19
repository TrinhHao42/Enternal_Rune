import type { Metadata } from "next";
import React from "react";
import CustomerMetrics from "@/components/customers/CustomerMetrics";
import CustomerTable from "@/components/customers/CustomerTable";

export const metadata: Metadata = {
  title: "Danh sách khách hàng | Admin Dashboard",
  description: "Quản lý danh sách khách hàng",
};

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-title-md font-bold text-gray-800 dark:text-white/90">
            Danh sách khách hàng
          </h1>
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
            Quản lý và theo dõi tất cả khách hàng trong hệ thống
          </p>
        </div>
      </div>

      {/* Metrics */}
      <CustomerMetrics />

      {/* Customer Table */}
      <CustomerTable />
    </div>
  );
}
