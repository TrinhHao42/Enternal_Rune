import type { Metadata } from "next";
import React from "react";
import StaffMetrics from "@/components/staff/StaffMetrics";
import StaffTable from "@/components/staff/StaffTable";

export const metadata: Metadata = {
  title: "Danh sách nhân viên | Admin Dashboard",
  description: "Quản lý danh sách nhân viên",
};

export default function StaffPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-title-md font-bold text-gray-800 dark:text-white/90">
            Danh sách nhân viên
          </h1>
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
            Quản lý và theo dõi tất cả nhân viên trong hệ thống
          </p>
        </div>
      </div>

      {/* Metrics */}
      <StaffMetrics />

      {/* Staff Table */}
      <StaffTable />
    </div>
  );
}
