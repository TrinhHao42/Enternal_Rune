import React from 'react'

interface PersonalDetailsProps {
    formData: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        district: string;
        ward: string;
    };
    onInputChange: (field: string, value: string) => void;
}

const PersonalDetails = ({ formData, onInputChange }: PersonalDetailsProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin cá nhân</h2>
            <p className="text-sm text-gray-600 mb-6">Vui lòng điền đầy đủ thông tin giao hàng của bạn</p>

            <div className="space-y-4">
                {/* Họ và tên */}
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => onInputChange('fullName', e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* Email và Số điện thoại */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => onInputChange('email', e.target.value)}
                            placeholder="example@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => onInputChange('phone', e.target.value)}
                            placeholder="0912345678"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                </div>

                {/* Địa chỉ */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={(e) => onInputChange('address', e.target.value)}
                        placeholder="Số nhà, tên đường"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* Tỉnh/Thành phố, Quận/Huyện, Phường/Xã */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                            Tỉnh/Thành phố <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="city"
                            value={formData.city}
                            onChange={(e) => onInputChange('city', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        >
                            <option value="">Chọn tỉnh/thành</option>
                            <option value="hanoi">Hà Nội</option>
                            <option value="hcm">TP. Hồ Chí Minh</option>
                            <option value="danang">Đà Nẵng</option>
                            <option value="haiphong">Hải Phòng</option>
                            <option value="cantho">Cần Thơ</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                            Quận/Huyện <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="district"
                            value={formData.district}
                            onChange={(e) => onInputChange('district', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        >
                            <option value="">Chọn quận/huyện</option>
                            <option value="district1">Quận 1</option>
                            <option value="district2">Quận 2</option>
                            <option value="district3">Quận 3</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-2">
                            Phường/Xã <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="ward"
                            value={formData.ward}
                            onChange={(e) => onInputChange('ward', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        >
                            <option value="">Chọn phường/xã</option>
                            <option value="ward1">Phường 1</option>
                            <option value="ward2">Phường 2</option>
                            <option value="ward3">Phường 3</option>
                        </select>
                    </div>
                </div>

                {/* Ghi chú */}
                <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                        Ghi chú đơn hàng (Tùy chọn)
                    </label>
                    <textarea
                        id="note"
                        rows={4}
                        placeholder="Ghi chú về đơn hàng của bạn, ví dụ: giao hàng ngoài giờ hành chính..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails
