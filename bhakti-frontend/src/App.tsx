import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { NotificationProvider } from "./contexts/NotificationContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CalendarPage from "./pages/CalendarPage";
import Devotional from "./pages/Devotional";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Wishlist from "./pages/Wishlist";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import AdminReports from "./pages/admin/AdminReports";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ProductProvider>
              <WishlistProvider>
                <NotificationProvider>
                  <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">
                      <ScrollToTop />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route path="/devotional" element={<Devotional />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/admin/reports" element={<AdminReports />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </NotificationProvider>
              </WishlistProvider>
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;