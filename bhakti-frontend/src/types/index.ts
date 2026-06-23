export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  stock: number;
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  paymentMode: "cash" | "upi";
  status: "pending" | "confirmed" | "ready" | "completed" | "cancelled";
  pickupTime?: string;
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "ADMIN" | "CUSTOMER";
}

export interface Festival {
  id: string;
  name: string;
  date: string;
  description: string;
  significance: string;
  rituals: string[];
  muhurat?: string;
  image: string;
}

export interface Aarti {
  id: string;
  name: string;
  deity: string;
  lyricsHindi: string;
  lyricsEnglish: string;
  image: string;
}

export interface Quote {
  id: string;
  text: string;
  source: string;
  category: "shloka" | "mantra" | "wisdom";
}
