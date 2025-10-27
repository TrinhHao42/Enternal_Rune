import { useState } from 'react'

interface PersonalDetailsProps {
    formData: {
        fullName: string;
        email: string;
        street: string;
        city: string;
        district: string;
        ward: string;
    };
    onInputChange: (field: string, value: string) => void;
}

const PersonalDetails = ({ formData, onInputChange }: PersonalDetailsProps) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const patterns = {
        fullName: /^[a-zA-ZÀ-ỹ\s]{2,50}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        streetName: /^.{2,200}$/
    };

    const validateField = (field: string, value: string): string => {
        switch (field) {
            case 'fullName':
                if (!value.trim()) return '';
                if (!patterns.fullName.test(value)) return 'Họ tên chỉ chứa chữ cái và khoảng trắng (2-50 ký tự)';
                return '';
            case 'email':
                if (!value.trim()) return '';
                if (!patterns.email.test(value)) return 'Email không hợp lệ';
                return '';
            case 'street':
                if (!value.trim()) return '';
                if (!patterns.streetName.test(value)) return 'tên đường phải từ 2-200 ký tự';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (field: string, value: string) => {
        onInputChange(field, value);
        if (touched[field]) {
            const error = validateField(field, value);
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const error = validateField(field, formData[field as keyof typeof formData]);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thông tin cá nhân</h2>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            onBlur={() => handleBlur('fullName')}
                            placeholder="Nguyễn Văn A"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.fullName && touched.fullName
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                                }`}
                            required
                        />
                        {errors.fullName && touched.fullName && (
                            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                            placeholder="example@email.com"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.email && touched.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                                }`}
                            required
                        />
                        {errors.email && touched.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                            Tỉnh/Thành phố <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            onBlur={() => handleBlur('city')}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition bg-white ${errors.city && touched.city
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                                }`}
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
                            Quận <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="district"
                            value={formData.district}
                            onChange={(e) => handleChange('district', e.target.value)}
                            onBlur={() => handleBlur('district')}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition bg-white ${errors.district && touched.district
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                                }`}
                            required
                        >
                            <option value="">Chọn quận</option>
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
                            onChange={(e) => handleChange('ward', e.target.value)}
                            onBlur={() => handleBlur('ward')}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition bg-white ${errors.ward && touched.ward
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                                }`}
                            required
                        >
                            <option value="">Chọn phường/xã</option>
                            <option value="ward1">Phường 1</option>
                            <option value="ward2">Phường 2</option>
                            <option value="ward3">Phường 3</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                        Số nhà, tên đường <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="street"
                        value={formData.street}
                        onChange={(e) => handleChange('street', e.target.value)}
                        onBlur={() => handleBlur('street')}
                        placeholder="Số nhà, tên đường"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.street && touched.street
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                            }`}
                        required
                    />
                    {errors.street && touched.street && (
                        <p className="mt-1 text-sm text-red-600">{errors.street}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails
