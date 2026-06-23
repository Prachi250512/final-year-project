import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import API from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

export default function Checkout() {
  const { items, total, placeOrder } = useCart();
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState<"cash" | "upi">("upi");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const { user } = useAuth();

  useEffect(() => {
  if (items.length === 0) {
    navigate("/cart");
  }
}, [items, navigate]);

  const handleOrder = async () => {
    try {
      const order = await placeOrder(paymentMode, pickupTime, notes);

      if (order) {
        toast.success("Order placed successfully!", {
          description: "Visit the store for pickup."
        });
        navigate("/profile");
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in max-w-2xl">
      <h1 className="font-display text-3xl font-bold mb-6">Checkout</h1>

      {/* Items Summary */}
      <div className="p-4 rounded-xl border border-border bg-card mb-6">
        <h3 className="font-semibold mb-3">Order Items ({items.length})</h3>
        {items.map(i => (
          <div key={i.product.id} className="flex justify-between text-sm py-1">
            <span>{i.product.name} × {i.quantity}</span>
            <span>₹{i.product.price * i.quantity}</span>
          </div>
        ))}
        <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
          <span>Total</span><span className="text-primary">₹{total}</span>
        </div>
      </div>

      {/* Payment Mode */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Payment Method</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentMode("upi")}
            className={`p-4 rounded-xl border text-center transition-all ${paymentMode === "upi" ? "border-primary bg-primary/5" : "border-border"}`}
          >
            <p className="text-2xl mb-1">📱</p>
            <p className="text-sm font-medium">UPI Payment</p>
            <p className="text-[10px] text-muted-foreground">Pay at pickup via UPI</p>
          </button>
          <button
            onClick={() => setPaymentMode("cash")}
            className={`p-4 rounded-xl border text-center transition-all ${paymentMode === "cash" ? "border-primary bg-primary/5" : "border-border"}`}
          >
            <p className="text-2xl mb-1">💵</p>
            <p className="text-sm font-medium">Cash</p>
            <p className="text-[10px] text-muted-foreground">Pay cash at store</p>
          </button>
        </div>
      </div>

      {/* Pickup Time */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Preferred Pickup Time</h3>
        <Input
          type="datetime-local"
          value={pickupTime}
          onChange={e => setPickupTime(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Notes (Optional)</h3>
        <Textarea
          placeholder="Any special instructions..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      <div className="bg-muted/50 rounded-xl p-4 mb-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">📍 Pickup Location</p>
        <p>Shree Sidhivinayak Pooja Store</p>
        <p>🕐 Open: 9:00 AM – 9:00 PM (All days)</p>
      </div>

      <Button onClick={handleOrder} className="w-full gradient-saffron text-primary-foreground border-0" size="lg">
        Place Order — ₹{total}
      </Button>
    </div>
  );
}
