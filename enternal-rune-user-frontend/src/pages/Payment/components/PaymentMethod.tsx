import React, { useState } from 'react'
import { CreditCard } from 'lucide-react'

interface PaymentMethodProps {
    selectedMethod: string;
    onMethodChange: (method: string) => void;
    cardData: {
        cardNumber: string;
        cardName: string;
        expiryDate: string;
        cvv: string;
    };
    onCardDataChange: (field: string, value: string) => void;
}

const PaymentMethod = ({ selectedMethod, onMethodChange, cardData, onCardDataChange }: PaymentMethodProps) => {
    const [acceptTerms, setAcceptTerms] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Chọn phương thức thanh toán</h2>
            <p className="text-sm text-gray-600 mb-6">Tất cả giao dịch đều được bảo mật và mã hóa</p>

            <div className="space-y-4">
                {/* PayPal */}
                <div
                    onClick={() => onMethodChange('paypal')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                        selectedMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="payment"
                                checked={selectedMethod === 'paypal'}
                                onChange={() => onMethodChange('paypal')}
                                className="w-5 h-5 text-blue-600 cursor-pointer"
                            />
                            <label className="font-medium text-gray-900 cursor-pointer">PayPal</label>
                        </div>
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='24' viewBox='0 0 80 24'%3E%3Ctext x='0' y='18' font-family='Arial' font-size='20' font-weight='bold' fill='%23003087'%3EPayPal%3C/text%3E%3C/svg%3E" alt="PayPal" className="h-6" />
                    </div>
                </div>

                {/* Credit Card */}
                <div
                    onClick={() => onMethodChange('credit-card')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                        selectedMethod === 'credit-card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="payment"
                                checked={selectedMethod === 'credit-card'}
                                onChange={() => onMethodChange('credit-card')}
                                className="w-5 h-5 text-blue-600 cursor-pointer"
                            />
                            <label className="font-medium text-gray-900 cursor-pointer">Thẻ tín dụng</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' viewBox='0 0 32 20'%3E%3Crect width='32' height='20' rx='3' fill='%231434CB'/%3E%3Ctext x='6' y='14' font-family='Arial' font-size='10' font-weight='bold' fill='white'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="h-5" />
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' viewBox='0 0 32 20'%3E%3Crect width='32' height='20' rx='3' fill='%23EB001B'/%3E%3Ccircle cx='12' cy='10' r='6' fill='%23EB001B'/%3E%3Ccircle cx='20' cy='10' r='6' fill='%23FF5F00'/%3E%3C/svg%3E" alt="Mastercard" className="h-5" />
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' viewBox='0 0 32 20'%3E%3Crect width='32' height='20' rx='3' fill='%23FF6000'/%3E%3Ctext x='4' y='14' font-family='Arial' font-size='8' font-weight='bold' fill='white'%3EDISCOVER%3C/text%3E%3C/svg%3E" alt="Discover" className="h-5" />
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' viewBox='0 0 32 20'%3E%3Crect width='32' height='20' rx='3' fill='%23016FD0'/%3E%3Ctext x='6' y='14' font-family='Arial' font-size='8' font-weight='bold' fill='white'%3EAMEX%3C/text%3E%3C/svg%3E" alt="Amex" className="h-5" />
                        </div>
                    </div>

                    {selectedMethod === 'credit-card' && (
                        <div className="space-y-4 mt-4 pt-4 border-t">
                            <p className="text-sm text-gray-600">Thanh toán an toàn bằng Visa, Maestro, Discover hoặc American Express của bạn</p>
                            
                            {/* Card Number */}
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    Số thẻ
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        value={cardData.cardNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                                            onCardDataChange('cardNumber', value);
                                        }}
                                        placeholder="1234 1234 1234 1234"
                                        maxLength={19}
                                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Card Name, Expiry, CVV */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Tên trên thẻ
                                    </label>
                                    <input
                                        type="text"
                                        id="cardName"
                                        value={cardData.cardName}
                                        onChange={(e) => onCardDataChange('cardName', e.target.value)}
                                        placeholder="NGUYEN VAN A"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngày hết hạn
                                    </label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        value={cardData.expiryDate}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, '');
                                            if (value.length >= 2) {
                                                value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
                                            }
                                            onCardDataChange('expiryDate', value);
                                        }}
                                        placeholder="MM / YY"
                                        maxLength={7}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        value={cardData.cvv}
                                        onChange={(e) => onCardDataChange('cvv', e.target.value.replace(/\D/g, ''))}
                                        placeholder="CVV"
                                        maxLength={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Google Pay */}
                <div
                    onClick={() => onMethodChange('google-pay')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                        selectedMethod === 'google-pay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="payment"
                                checked={selectedMethod === 'google-pay'}
                                onChange={() => onMethodChange('google-pay')}
                                className="w-5 h-5 text-blue-600 cursor-pointer"
                            />
                            <label className="font-medium text-gray-900 cursor-pointer">Google Pay</label>
                        </div>
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='24' viewBox='0 0 60 24'%3E%3Ctext x='0' y='18' font-family='Arial' font-size='16' font-weight='500' fill='%235F6368'%3EG%3C/text%3E%3Ctext x='12' y='18' font-family='Arial' font-size='16' fill='%234285F4'%3EP%3C/text%3E%3Ctext x='22' y='18' font-family='Arial' font-size='16' fill='%23EA4335'%3Ea%3C/text%3E%3Ctext x='30' y='18' font-family='Arial' font-size='16' fill='%23FBBC04'%3Ey%3C/text%3E%3C/svg%3E" alt="Google Pay" className="h-6" />
                    </div>
                </div>

                {/* Cash on Delivery */}
                <div
                    onClick={() => onMethodChange('cod')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                        selectedMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="payment"
                                checked={selectedMethod === 'cod'}
                                onChange={() => onMethodChange('cod')}
                                className="w-5 h-5 text-blue-600 cursor-pointer"
                            />
                            <label className="font-medium text-gray-900 cursor-pointer">Thanh toán khi nhận hàng</label>
                        </div>
                        <div className="bg-green-100 p-2 rounded">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-3 pt-4">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer mt-0.5"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                        Bằng cách chọn ô này, tôi đồng ý với{' '}
                        <a href="#" className="text-blue-600 hover:underline">Điều khoản & Điều kiện</a>
                        {' '}và{' '}
                        <a href="#" className="text-blue-600 hover:underline">Chính sách bảo mật</a>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod
