import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, BookOpen, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { useProducts } from "../contexts/ProductContext";
import { festivals } from "../data/festivals";
import { quotes } from "../data/quotes";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { products } = useProducts();
  const featured = products.filter(p => p.featured).slice(0, 4);
  const todayQuote = quotes[Math.floor(Date.now() / 86400000) % quotes.length];

  const upcomingFestivals = festivals
    .filter(f => new Date(f.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative gradient-saffron text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-sm font-medium opacity-80 mb-2">|| श्री गणेशाय नमः ||</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Shree Sidhivinayak</h1>
              <p className="text-xl md:text-2xl font-display opacity-90 mb-2">Bhakti Essentials Hub</p>
              <p className="text-sm opacity-80 mb-8 max-w-lg">Your trusted source for authentic pooja essentials, festival information, aartis, and spiritual guidance — all in one place.</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/shop">
                  <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                    <ShoppingBag className="h-4 w-4" /> Shop Now
                  </Button>
                </Link>
                <Link to="/calendar">
                  <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                    <Calendar className="h-4 w-4" /> Festival Calendar
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Quote */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6 shadow-lg max-w-2xl mx-auto text-center"
        >
          <p className="text-xs font-medium text-primary mb-2">🙏 Daily Spiritual Quote</p>
          <p className="font-display text-sm md:text-base italic leading-relaxed">"{todayQuote.text}"</p>
          <p className="text-xs text-muted-foreground mt-2">— {todayQuote.source}</p>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">Featured Products</h2>
          <Link to="/shop" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { icon: "🪄", name: "Agarbatti", cat: "agarbatti" },
            { icon: "⚪", name: "Kapoor", cat: "kapoor" },
            { icon: "🟤", name: "Dhoop", cat: "dhoop" },
            { icon: "🕉️", name: "Pooja Kits", cat: "pooja-kits" },
            { icon: "🪔", name: "Oil", cat: "oil" },
            { icon: "🔴", name: "Kumkum & Sindoor", cat: "kumkum" },
          ].map(c => (
            <Link key={c.cat} to={`/shop?cat=${c.cat}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <span className="text-3xl">{c.icon}</span>
                <span className="text-xs font-medium">{c.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Festivals */}
      <section className="bg-card border-y border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Upcoming Festivals</h2>
            <Link to="/calendar" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              View Calendar <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingFestivals.map(f => (
              <Link key={f.id} to="/calendar">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl border border-border bg-background hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{f.image}</span>
                    <div>
                      <h3 className="font-display font-semibold">{f.name}</h3>
                      <p className="text-xs text-primary font-medium">
                        {new Date(f.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{f.description}</p>
                  {f.muhurat && <p className="text-xs text-primary mt-2 font-medium">🕐 {f.muhurat}</p>}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/devotional">
            <motion.div whileHover={{ scale: 1.02 }} className="gradient-maroon text-primary-foreground rounded-xl p-6">
              <BookOpen className="h-8 w-8 mb-3 opacity-80" />
              <h3 className="font-display text-lg font-bold">Aartis & Bhajans</h3>
              <p className="text-sm opacity-80 mt-1">Access popular aartis and devotional songs with lyrics in Hindi & English.</p>
            </motion.div>
          </Link>
          <Link to="/calendar">
            <motion.div whileHover={{ scale: 1.02 }} className="gradient-saffron text-primary-foreground rounded-xl p-6">
              <Calendar className="h-8 w-8 mb-3 opacity-80" />
              <h3 className="font-display text-lg font-bold">Festival Calendar</h3>
              <p className="text-sm opacity-80 mt-1">Never miss a festival. Get dates, muhurat timings, and ritual guides.</p>
            </motion.div>
          </Link>
          <Link to="/shop">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-secondary text-secondary-foreground rounded-xl p-6">
              <ShoppingBag className="h-8 w-8 mb-3 opacity-80" />
              <h3 className="font-display text-lg font-bold">Order & Pick Up</h3>
              <p className="text-sm opacity-80 mt-1">Browse, order online, and collect from our store at your convenience.</p>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
}
