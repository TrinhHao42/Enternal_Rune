import type { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chỉnh sửa nhân viên | Admin Dashboard",
  description: "Chỉnh sửa thông tin nhân viên",
};

// Mock function to get staff data (replace with actual API call)
function getStaffById(id: string) {
  return {
    id: id,
    employeeId: "NV001",
    name: "Trần Văn Bình",
    email: "tranvanbinh@company.com",
    phone: "0912345678",
    dateOfBirth: "1992-08-20",
    gender: "male",
    position: "Senior Developer",
    department: "Phát triển",
    salary: 25000000,
    contractType: "full-time",
    startDate: "2023-01-15",
    address: "456 Đường Nguyễn Huệ",
    ward: "Phường Bến Thành",
    district: "Quận 1",
    province: "TP. Hồ Chí Minh",
    emergencyContactName: "Nguyễn Thị C",
    emergencyContactPhone: "0923456789",
    emergencyContactRelation: "Vợ",
    status: "active" as const,
    avatar: "/images/user/user-02.png",
    hasAccount: true,
    username: "binhTV",
    role: "staff",
  };
}

interface EditStaffPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStaffPage({ params }: EditStaffPageProps) {
  const { id } = await params;
  const staff = getStaffById(id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/staff"
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
              Chỉnh sửa nhân viên
            </h1>
          </div>
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            Cập nhật thông tin nhân viên {staff.name} - {staff.employeeId}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Thông tin cá nhân
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mã nhân viên <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={staff.employeeId}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="VD: NV001"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Họ và tên <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={staff.name}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Nhập họ và tên"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="email"
                    defaultValue={staff.email}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Số điện thoại <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="tel"
                    defaultValue={staff.phone}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="0901234567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    defaultValue={staff.dateOfBirth}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Giới tính
                  </label>
                  <select
                    defaultValue={staff.gender}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Thông tin công việc
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Chức vụ <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={staff.position}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="VD: Senior Developer"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phòng ban <span className="text-error-600">*</span>
                  </label>
                  <select
                    defaultValue={staff.department}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Chọn phòng ban</option>
                    <option value="Phát triển">Phát triển</option>
                    <option value="Kinh doanh">Kinh doanh</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Kế toán">Kế toán</option>
                    <option value="Nhân sự">Nhân sự</option>
                    <option value="Kỹ thuật">Kỹ thuật</option>
                    <option value="Hỗ trợ">Hỗ trợ</option>
                    <option value="Thiết kế">Thiết kế</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mức lương (VNĐ) <span className="text-error-600">*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={staff.salary}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Loại hợp đồng <span className="text-error-600">*</span>
                  </label>
                  <select
                    defaultValue={staff.contractType}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Chọn loại hợp đồng</option>
                    <option value="full-time">Toàn thời gian</option>
                    <option value="part-time">Bán thời gian</option>
                    <option value="contract">Hợp đồng</option>
                    <option value="internship">Thực tập</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ngày bắt đầu làm việc <span className="text-error-600">*</span>
                </label>
                <input
                  type="date"
                  defaultValue={staff.startDate}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Địa chỉ
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  defaultValue={staff.address}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Số nhà, tên đường"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tỉnh/Thành phố
                  </label>
                  <select
                    defaultValue={staff.province}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Chọn Tỉnh/TP</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quận/Huyện
                  </label>
                  <select
                    defaultValue={staff.district}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    <option value="Quận 1">Quận 1</option>
                    <option value="Quận 2">Quận 2</option>
                    <option value="Quận 3">Quận 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phường/Xã
                  </label>
                  <select
                    defaultValue={staff.ward}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Chọn Phường/Xã</option>
                    <option value="Phường Bến Nghé">Phường Bến Nghé</option>
                    <option value="Phường Bến Thành">Phường Bến Thành</option>
                    <option value="Phường Cầu Kho">Phường Cầu Kho</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Liên hệ khẩn cấp
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    defaultValue={staff.emergencyContactName}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Tên người liên hệ"
                  />
                </div>
                <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    defaultValue={staff.emergencyContactPhone}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="0901234567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mối quan hệ
                </label>
                <select
                  defaultValue={staff.emergencyContactRelation}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">Chọn mối quan hệ</option>
                  <option value="Vợ">Vợ</option>
                  <option value="Chồng">Chồng</option>
                  <option value="Cha">Cha</option>
                  <option value="Mẹ">Mẹ</option>
                  <option value="Anh/Chị/Em">Anh/Chị/Em</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Ảnh đại diện
            </h3>
            
            {/* Current Avatar */}
            <div className="mb-4">
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ảnh hiện tại
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                />
                <button
                  type="button"
                  className="px-4 py-2 text-theme-sm text-error-600 hover:text-error-700 font-medium"
                >
                  Xóa ảnh
                </button>
              </div>
            </div>

            {/* Upload New Avatar */}
            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tải ảnh mới
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p className="mt-2 text-theme-sm text-gray-600 dark:text-gray-400">
                  Kéo thả ảnh vào đây hoặc{" "}
                  <button type="button" className="text-brand-600 hover:text-brand-700">
                    chọn file
                  </button>
                </p>
                <p className="text-theme-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG tới 5MB
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
                  value="active"
                  defaultChecked={staff.status === "active"}
                  className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-theme-sm text-gray-700 dark:text-gray-300">
                  Đang làm việc
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="on-leave"
                  defaultChecked={staff.status === "on-leave"}
                  className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-theme-sm text-gray-700 dark:text-gray-300">
                  Đang nghỉ
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  defaultChecked={staff.status === "inactive"}
                  className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-theme-sm text-gray-700 dark:text-gray-300">
                  Đã nghỉ việc
                </span>
              </label>
            </div>
          </div>

          {/* Account Settings */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              Tài khoản hệ thống
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={staff.hasAccount}
                  className="w-4 h-4 text-brand-600 focus:ring-brand-500 rounded"
                />
                <span className="text-theme-sm text-gray-700 dark:text-gray-300">
                  Có tài khoản đăng nhập
                </span>
              </label>

              {staff.hasAccount && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tên đăng nhập
                    </label>
                    <input
                      type="text"
                      defaultValue={staff.username}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mật khẩu mới (để trống nếu không đổi)
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Role */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              Vai trò
            </h3>
            <select
              defaultValue={staff.role}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="admin">Quản trị viên</option>
              <option value="manager">Quản lý</option>
              <option value="staff">Nhân viên</option>
              <option value="viewer">Người xem</option>
            </select>
          </div>

          {/* Actions */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="space-y-3">
              <button className="w-full px-4 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium text-theme-sm">
                Lưu thay đổi
              </button>
              <Link
                href="/staff"
                className="block w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-theme-sm text-center dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Hủy
              </Link>
              <button
                type="button"
                className="w-full px-4 py-2.5 bg-error-50 text-error-600 rounded-lg hover:bg-error-100 font-medium text-theme-sm dark:bg-error-900/20 dark:hover:bg-error-900/30"
              >
                Xóa nhân viên
              </button>
            </div>
          </div>

          {/* Staff Info */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-theme-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              Thông tin
            </h3>
            <div className="space-y-3 text-theme-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">ID:</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  #{staff.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Mã NV:</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {staff.employeeId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tạo lúc:</span>
                <span className="text-gray-800 dark:text-gray-200">
                  15/01/2023
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
