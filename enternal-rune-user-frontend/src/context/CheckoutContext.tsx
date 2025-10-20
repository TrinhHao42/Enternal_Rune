'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '@/types/CartItem';

interface CheckoutContextType {
    checkoutItems: CartItem[];
    setCheckoutItems: (items: CartItem[]) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

    return (
        <CheckoutContext.Provider value={{ checkoutItems, setCheckoutItems }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
};
