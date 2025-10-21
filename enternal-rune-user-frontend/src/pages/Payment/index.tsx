'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCheckout } from '@/context/CheckoutContext'
import PersonalDetails from './components/PersonalDetails'
import PaymentMethod from './components/PaymentMethod'
import Complete from './components/Complete'
import OrderSummary from './components/OrderSummary'

const Payment = () => {
    const router = useRouter();
    const { checkoutItems } = useCheckout();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Form data states
    const [personalData, setPersonalData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        ward: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    // Redirect to cart if no items selected
    useEffect(() => {
        if (checkoutItems.length === 0) {
            router.push('/CartScreen');
        } else {
            setIsLoading(false);
        }
    }, [checkoutItems, router]);

    // Convert checkout items to order items format
    const orderItems = checkoutItems.map((item) => ({
        id: item.ciId,
        name: item.ciProductVariant.prodvName,
        image: item.ciProductVariant.prodvImage.imageData,
        quantity: item.ciQuantity,
        price: item.ciProductVariant.prodvPrice.ppPrice
    }));

    const steps = [
        { number: 1, name: 'Thông tin cá nhân', key: 'personal' },
        { number: 2, name: 'Thanh toán', key: 'payment' },
        { number: 3, name: 'Hoàn tất', key: 'complete' }
    ];

    const handlePersonalDataChange = (field: string, value: string) => {
        setPersonalData(prev => ({ ...prev, [field]: value }));
    };

    const handleCardDataChange = (field: string, value: string) => {
        setCardData(prev => ({ ...prev, [field]: value }));
    };

    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePayment = () => {
        // Process payment logic here
        handleNextStep();
    };

    const isStepValid = () => {
        if (currentStep === 1) {
            return personalData.fullName && personalData.email && personalData.phone && 
                   personalData.address && personalData.city && personalData.district && personalData.ward;
        }
        if (currentStep === 2) {
            if (paymentMethod === 'credit-card') {
                return cardData.cardNumber && cardData.cardName && cardData.expiryDate && cardData.cvv;
            }
            return true; // Other payment methods don't need validation
        }
        return true;
    };

    // Show loading while checking
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600">Đang tải...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                {/* Step Circle */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${
                                            currentStep > step.number
                                                ? 'bg-green-500 text-white'
                                                : currentStep === step.number
                                                ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                                                : 'bg-gray-300 text-gray-600'
                                        }`}
                                    >
                                        {currentStep > step.number ? (
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            step.number
                                        )}
                                    </div>
                                    <span className={`mt-2 text-xs sm:text-sm font-medium ${
                                        currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                                    }`}>
                                        {step.name}
                                    </span>
                                </div>

                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className={`w-16 sm:w-32 h-1 mx-2 transition-all duration-300 ${
                                        currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side - Forms */}
                    <div className="flex-1">
                        {currentStep === 1 && (
                            <PersonalDetails
                                formData={personalData}
                                onInputChange={handlePersonalDataChange}
                            />
                        )}

                        {currentStep === 2 && (
                            <PaymentMethod
                                selectedMethod={paymentMethod}
                                onMethodChange={setPaymentMethod}
                                cardData={cardData}
                                onCardDataChange={handleCardDataChange}
                            />
                        )}

                        {currentStep === 3 && (
                            <Complete
                                orderNumber="ER2025001234"
                                estimatedDelivery="25-27 Tháng 10, 2025"
                            />
                        )}

                        {/* Navigation Buttons */}
                        {currentStep < 3 && (
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                {currentStep > 1 && (
                                    <button
                                        onClick={handlePreviousStep}
                                        className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-800 text-gray-800 rounded-lg font-semibold hover:bg-gray-800 hover:text-white active:scale-95 transition-all duration-150"
                                    >
                                        ← Quay lại
                                    </button>
                                )}
                                <button
                                    onClick={currentStep === 2 ? handlePayment : handleNextStep}
                                    disabled={!isStepValid()}
                                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                                >
                                    {currentStep === 2 ? `Thanh toán | ${(orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}` : 'Tiếp tục →'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="lg:w-96">
                        <OrderSummary items={orderItems} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
