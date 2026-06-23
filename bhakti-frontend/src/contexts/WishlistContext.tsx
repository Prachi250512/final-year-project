import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../types";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const key = user ? `bhakti_wishlist_${user.id}` : "bhakti_wishlist_guest";
    const saved = localStorage.getItem(key);
    if (saved) setWishlist(JSON.parse(saved));
    else setWishlist([]);
  }, [user]);

  useEffect(() => {
    const key = user ? `bhakti_wishlist_${user.id}` : "bhakti_wishlist_guest";
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist, user]);

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.some(p => p.id === productId);

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
