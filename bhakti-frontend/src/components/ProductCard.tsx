import { Product } from "../types";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { Button } from "../components/ui/button";
import { Plus, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const toggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist! 💝");
    }
  };

  const image = product.image ?? "";

  const imageUrl =
    image && (
      image.startsWith("data:") ||
      image.startsWith("http") ||
      image.startsWith("blob:")
    )
      ? image
      : image
      ? `http://localhost:8080/uploads/${image}`
      : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square bg-muted flex items-center justify-center text-6xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-2"
          />
          ) : (
          <span>📦</span>
        )}
        {product.badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold gradient-saffron text-primary-foreground">
            {product.badge}
          </span>
        )}
        {product.stock !== null && product.stock !== undefined && product.stock < 10 && (
          <span className="absolute top-2 right-10 px-2 py-0.5 rounded-full text-[10px] font-bold bg-destructive text-destructive-foreground">
            Low Stock
          </span>
        )}
        <button
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
            wishlisted
              ? "bg-primary text-primary-foreground"
              : "bg-background/80 text-muted-foreground hover:text-primary"
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-sm line-clamp-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <Button size="sm" onClick={handleAdd} className="gradient-saffron text-primary-foreground border-0 gap-1">
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
