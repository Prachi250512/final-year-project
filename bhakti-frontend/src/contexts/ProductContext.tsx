import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../types";

interface ProductContextType {
  products: Product[];
  addProduct: (formData: FormData) => Promise<void>;
  updateProduct: (id: string, formData: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType>({} as ProductContextType);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const refreshProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const addProduct = async (formData: FormData) => {
    await fetch("http://localhost:8080/api/products", {
      method: "POST",
      body: formData,
    });

    await refreshProducts();
  };

  const updateProduct = async (id: string, formData: FormData) => {
    await fetch(`http://localhost:8080/api/products/${id}`, {
      method: "PUT",
      body: formData, // multipart update
    });

    await refreshProducts();
  };

  const deleteProduct = async (id: string) => {
    await fetch(`http://localhost:8080/api/products/${id}`, {
      method: "DELETE",
    });

    await refreshProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);