import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product, Order } from "../types";
import { useAuth } from "./AuthContext";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  orders: Order[];
  placeOrder: (paymentMode: "cash" | "upi", pickupTime?: string, notes?: string) => Promise<Order | null>;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("bhakti_cart");
    if (saved) setItems(JSON.parse(saved));
    const savedOrders = localStorage.getItem("bhakti_orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem("bhakti_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("bhakti_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQty = (productId: number, qty: number) => {
    if (qty <= 0) { removeFromCart(productId); return; }
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const placeOrder = async (
    paymentMode: "cash" | "upi",
    pickupTime?: string,
    notes?: string
  ): Promise<Order | null> => {

    if (!user || items.length === 0) return null;

    const stored = localStorage.getItem("token");
    if (!stored) return null;

    const jwt = JSON.parse(stored).token;

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({
          paymentMode,
          pickupTime,
          notes,
          items: items.map(i => ({
            productId: i.product.id,
            quantity: i.quantity
          }))
        })
      });

      if (!response.ok) throw new Error("Order failed");

      const savedOrder = await response.json();

      setOrders(prev => [savedOrder, ...prev]);
      
      clearCart();
      return savedOrder;

    } catch (error) {
      console.error("Order error:", error);
      return null;
    }
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, itemCount, orders, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
