import React from 'react'
import { CheckCircle2, Package, Truck, Home } from 'lucide-react'

interface CompleteProps {
    orderNumber: string;
    estimatedDelivery: string;
}

const Complete = ({ orderNumber, estimatedDelivery }: CompleteProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Success Icon */}
            <div className="flex flex-col items-center text-center mb-8">
                <div className="bg-green-100 rounded-full p-4 mb-4">
                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h2>
                <p className="text-gray-600 text-lg">Cảm ơn bạn đã mua hàng</p>
            </div>

            {/* Order Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Mã đơn hàng</p>
                        <p className="text-2xl font-bold text-gray-900">#{orderNumber}</p>
                    </div>
                    <div className="text-left sm:text-right">
                        <p className="text-sm text-gray-600 mb-1">Dự kiến giao hàng</p>
                        <p className="text-lg font-semibold text-blue-600">{estimatedDelivery}</p>
                    </div>
                </div>
            </div>

            {/* Order Timeline */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái đơn hàng</h3>
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200"></div>
                    
                    {/* Steps */}
                    <div className="space-y-6">
                        {/* Step 1 - Completed */}
                        <div className="flex items-start gap-4 relative">
                            <div className="bg-green-500 rounded-full p-2 z-10">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 pt-1">
                                <h4 className="font-semibold text-gray-900">Đơn hàng đã được xác nhận</h4>
                                <p className="text-sm text-gray-600">Chúng tôi đã nhận được đơn hàng của bạn</p>
                                <p className="text-xs text-gray-500 mt-1">Hôm nay, 10:30 SA</p>
                            </div>
                        </div>

                        {/* Step 2 - In Progress */}
                        <div className="flex items-start gap-4 relative">
                            <div className="bg-blue-500 rounded-full p-2 z-10 animate-pulse">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 pt-1">
                                <h4 className="font-semibold text-gray-900">Đang chuẩn bị hàng</h4>
                                <p className="text-sm text-gray-600">Đơn hàng đang được đóng gói</p>
                                <p className="text-xs text-gray-500 mt-1">Đang xử lý...</p>
                            </div>
                        </div>

                        {/* Step 3 - Pending */}
                        <div className="flex items-start gap-4 relative">
                            <div className="bg-gray-300 rounded-full p-2 z-10">
                                <Truck className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 pt-1">
                                <h4 className="font-semibold text-gray-500">Đang vận chuyển</h4>
                                <p className="text-sm text-gray-500">Đơn hàng sẽ được giao sớm</p>
                            </div>
                        </div>

                        {/* Step 4 - Pending */}
                        <div className="flex items-start gap-4 relative">
                            <div className="bg-gray-300 rounded-full p-2 z-10">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 pt-1">
                                <h4 className="font-semibold text-gray-500">Đã giao hàng</h4>
                                <p className="text-sm text-gray-500">Đơn hàng đã đến tay bạn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Email Confirmation */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-sm font-medium text-yellow-800">Kiểm tra email của bạn</p>
                        <p className="text-sm text-yellow-700 mt-1">
                            Chúng tôi đã gửi xác nhận đơn hàng và hóa đơn đến email của bạn.
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-150">
                    Theo dõi đơn hàng
                </button>
                <button className="flex-1 border-2 border-gray-800 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 hover:text-white active:scale-95 transition-all duration-150">
                    Tiếp tục mua sắm
                </button>
            </div>

            {/* Support Section */}
            <div className="mt-8 pt-6 border-t text-center">
                <p className="text-sm text-gray-600 mb-2">Cần hỗ trợ?</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        support@eternalrune.com
                    </a>
                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        1900-xxxx
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Complete
