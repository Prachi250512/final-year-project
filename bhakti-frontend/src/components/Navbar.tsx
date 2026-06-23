import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut, Shield, Bell, Heart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useNotifications } from "../contexts/NotificationContext";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/calendar", label: "Festivals" },
  { path: "/devotional", label: "Devotional" },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🙏</span>
          <div>
            <h1 className="font-display text-lg font-bold leading-tight text-primary">Shree Sidhivinayak</h1>
            <p className="text-[10px] tracking-wider text-muted-foreground">BHAKTI ESSENTIALS HUB</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.path ? "text-primary" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Heart className="h-5 w-5" />
          </Link>

          <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Shield className="h-3.5 w-3.5" /> Admin
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-1">
                  <User className="h-3.5 w-3.5" /> {user.name}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Link to="/auth" className="hidden md:block">
              <Button size="sm" className="gradient-saffron text-primary-foreground border-0">Login</Button>
            </Link>
          )}

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="container mx-auto p-4 flex flex-col gap-3">
              {navLinks.map(l => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 ${location.pathname === l.path ? "text-primary" : "text-muted-foreground"}`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2 text-muted-foreground">💝 Wishlist</Link>
              <Link to="/notifications" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2 text-muted-foreground">
                🔔 Notifications {unreadCount > 0 && `(${unreadCount})`}
              </Link>
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2 text-muted-foreground">Admin Panel</Link>
                  )}
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2 text-muted-foreground">Profile</Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm font-medium py-2 text-left text-destructive">Logout</button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full gradient-saffron text-primary-foreground border-0">Login / Sign Up</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
