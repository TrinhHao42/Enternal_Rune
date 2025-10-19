'use client'

import React, { useState, useEffect } from "react";
import CartItem from "@/app/types/CartItem";
import { createContext, useContextSelector } from "use-context-selector";
import { useDebouncedCallback } from "use-debounce";
import AxiosInstance from "@/configs/AxiosInstance";

type CartContextProps = {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  addCartItem: (item: CartItem) => void;
  removeCartItem: (itemId: number) => void;
  updateCartItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  refreshCart: () => void;
};

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await AxiosInstance.get(`http://localhost:3001/cart`);
      console.log(res.data)
      setCartItems(res.data);
      localStorage.setItem("cart", JSON.stringify(res.data));
    } catch {
      setError("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  const debouncedUpdate = useDebouncedCallback(async () => {
    try {
      setSyncing(true);
      await AxiosInstance.put(`${process.env.BACK_END_URL}/cart`, cartItems);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch {
      setError("Không thể cập nhật giỏ hàng");
    } finally {
      setSyncing(false);
    }
  }, 500);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (!initialized) return;
    if (cartItems.length > 0) debouncedUpdate();
  }, [cartItems]);

  const addCartItem = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.ciId === item.ciId);
      if (existing) {
        return prev.map((i) =>
          i.ciId === item.ciId
            ? { ...i, ciQuantity: i.ciQuantity + item.ciQuantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeCartItem = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.ciId !== itemId));
  };

  const updateCartItemQuantity = (itemId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.ciId === itemId ? { ...item, ciQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const refreshCart = () => fetchCart();

  const value: CartContextProps = {
    cartItems,
    loading: loading || syncing,
    error,
    addCartItem,
    removeCartItem,
    updateCartItemQuantity,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContextSelector(CartContext, (ctx) => ctx);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export default CartContext;