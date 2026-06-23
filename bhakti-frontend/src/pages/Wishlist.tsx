import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <p className="text-6xl mb-4">💝</p>
        <h2 className="font-display text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">Save products you love for later!</p>
        <Link to="/shop">
          <Button className="gradient-saffron text-primary-foreground border-0 gap-2">
            <ShoppingBag className="h-4 w-4" /> Browse Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold flex items-center gap-2">
            <Heart className="h-7 w-7 text-primary" /> My Wishlist
          </h1>
          <p className="text-sm text-muted-foreground">{wishlist.length} item{wishlist.length > 1 ? "s" : ""} saved</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { clearWishlist(); toast.success("Wishlist cleared"); }}>
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="aspect-square bg-muted flex items-center justify-center text-6xl relative">
              {product.image ? (
                <img
                  src={`http://localhost:8080/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl">{product.image}</span>
              )}
              <button
                onClick={() => { removeFromWishlist(product.id); toast.success("Removed from wishlist"); }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-display font-semibold text-sm line-clamp-1">{product.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-primary">₹{product.price}</span>
                <Button
                  size="sm"
                  onClick={() => { addToCart(product); toast.success(`${product.name} added to cart!`); }}
                  className="gradient-saffron text-primary-foreground border-0 gap-1"
                >
                  <ShoppingBag className="h-3.5 w-3.5" /> Add
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}