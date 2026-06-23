import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useProducts } from "../contexts/ProductContext";
import { categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const activeCat = searchParams.get("cat") || "all";

  const filtered = useMemo(() => {
    let result = products;
    if (activeCat !== "all") {
      result = result.filter(p => p.category === activeCat);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return result;
  }, [products, activeCat, search]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold mb-2">Shop Pooja Essentials</h1>
      <p className="text-sm text-muted-foreground mb-6">Browse our collection of authentic devotional items</p>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <Button
          variant={activeCat === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSearchParams({})}
          className={activeCat === "all" ? "gradient-saffron text-primary-foreground border-0" : ""}
        >
          All
        </Button>
        {categories.map(c => (
          <Button
            key={c.id}
            variant={activeCat === c.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchParams({ cat: c.id })}
            className={`whitespace-nowrap ${activeCat === c.id ? "gradient-saffron text-primary-foreground border-0" : ""}`}
          >
            {c.icon} {c.name}
          </Button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-muted-foreground">No products found. Try a different search or category.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mb-4">{filtered.length} products found</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </div>
  );
}
