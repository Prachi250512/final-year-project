import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🙏</span>
              <div>
                <h3 className="font-display font-bold text-primary">Shree Sidhivinayak</h3>
                <p className="text-[10px] tracking-wider text-muted-foreground">BHAKTI ESSENTIALS HUB</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Your trusted source for authentic pooja essentials since 2020. Serving devotees with devotion and reliability.</p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <Link to="/calendar" className="hover:text-primary transition-colors">Festival Calendar</Link>
              <Link to="/devotional" className="hover:text-primary transition-colors">Aartis & Bhajans</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Categories</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/shop?cat=agarbatti" className="hover:text-primary transition-colors">Agarbatti</Link>
              <Link to="/shop?cat=dhoop" className="hover:text-primary transition-colors">Dhoop</Link>
              <Link to="/shop?cat=kapoor" className="hover:text-primary transition-colors">Kapoor</Link>
              <Link to="/shop?cat=oil" className="hover:text-primary transition-colors">Pooja Oil</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Visit Us</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>📍 Shree Sidhivinayak Pooja Store</p>
              <p>📞 +91 90862 52820</p>
              <p>🕐 10:00 AM – 10:30 PM (All days)</p>
              <p>💳 Cash & UPI accepted</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 Shree Sidhivinayak – Bhakti Essentials Hub. All rights reserved.</p>
          <p className="mt-1">🙏 || श्री गणेशाय नमः || 🙏</p>
        </div>
      </div>
    </footer>
  );
}
