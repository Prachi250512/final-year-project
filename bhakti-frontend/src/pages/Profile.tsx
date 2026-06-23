import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LogOut, ShoppingBag, Package } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../lib/api";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my-orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">🙏 {user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="gap-1"
        >
          <LogOut className="h-3.5 w-3.5" /> Logout
        </Button>
      </div>

      <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
        <Package className="h-5 w-5" /> My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-muted-foreground mb-4">No orders yet</p>

          <Link to="/shop">
            <Button className="gradient-saffron text-primary-foreground border-0 gap-1">
              <ShoppingBag className="h-3.5 w-3.5" /> Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-sm">Order</p>

                  <p className="text-xs text-muted-foreground">
                    {new Date(order.orderDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 capitalize">
                  {order.status || "completed"}
                </span>
              </div>

              <div className="text-sm space-y-1">
                {order.items?.map((i: any) => (
                  <div
                    key={i.product.id}
                    className="flex justify-between text-muted-foreground"
                  >
                    <span>
                      {i.product.name} × {i.quantity}
                    </span>

                    <span>₹{i.product.price * i.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-3 pt-2 border-t border-border text-sm">
                <span className="text-muted-foreground">
                  Payment: {order.paymentMode?.toUpperCase() || "COD"}
                </span>

                <span className="font-bold text-primary">
                  Total: ₹{order.totalAmount}
                </span>
              </div>

              {order.pickupTime && (
                <p className="text-xs text-muted-foreground mt-1">
                  🕐 Pickup: {new Date(order.pickupTime).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
