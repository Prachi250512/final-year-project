import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="font-display text-2xl font-bold mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-6">
          Add some pooja essentials to get started!
        </p>

        <Link to="/shop">
          <Button className="gradient-saffron text-primary-foreground border-0 gap-2">
            <ShoppingBag className="h-4 w-4" />
            Browse Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
            >
              {/* PRODUCT IMAGE */}
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden">
                {item.product.image ? (
                  <img
                    src={`http://localhost:8080/uploads/${item.product.image}`}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span>{item.product.image}</span>
                )}
              </div>

              {/* PRODUCT INFO */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-1">
                  {item.product.name}
                </h3>

                <p className="text-primary font-bold">
                  ₹{item.product.price}
                </p>
              </div>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() =>
                    updateQty(Number(item.product.id), item.quantity - 1)
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() =>
                    updateQty(Number(item.product.id), item.quantity + 1)
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* ITEM TOTAL */}
              <p className="font-bold text-sm w-16 text-right">
                ₹{item.product.price * item.quantity}
              </p>

              {/* REMOVE ITEM */}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive"
                onClick={() => removeFromCart(Number(item.product.id))}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          ))}

          {/* CLEAR CART */}
          <Button
            variant="outline"
            size="sm"
            onClick={clearCart}
            className="text-destructive"
          >
            Clear Cart
          </Button>
        </div>

        {/* ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-xl border border-border bg-card sticky top-20">
            <h3 className="font-display font-bold text-lg mb-4">
              Order Summary
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({items.length} items)
                </span>

                <span>₹{total}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Pickup
                </span>

                <span className="text-green-600">
                  Free
                </span>
              </div>

              <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
                <span>Total</span>

                <span className="text-primary">
                  ₹{total}
                </span>
              </div>
            </div>

            <Link to={user ? "/checkout" : "/auth"}>
              <Button className="w-full mt-4 gradient-saffron text-primary-foreground border-0 gap-2">
                {user ? "Proceed to Checkout" : "Login to Checkout"}

                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <p className="text-[10px] text-muted-foreground text-center mt-2">
              🏪 Store Pickup Only
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}