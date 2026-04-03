import { useEffect, useMemo, useState } from "react";
import { products, categories, categoryMap } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import { apiRequest } from "@/lib/api";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [catalog, setCatalog] = useState(products);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    void (async () => {
      const response = await apiRequest<{ products: typeof products }>("/api/products");
      if (response.ok && response.data?.products) {
        setCatalog(response.data.products);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const cat = categoryMap[activeCategory];
    return catalog.filter((p) => {
      const matchCat = cat === "all" || p.category === cat;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.vendor.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, catalog, search]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast("Removed from wishlist"); }
      else { next.add(id); showToast("Added to wishlist ♥"); }
      return next;
    });
  };

  const handleAdd = (product: typeof products[0]) => {
    addToCart(product);
    showToast(`${product.emoji} ${product.name} added to cart!`);
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <section className="py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h1 className="font-display font-extrabold text-[clamp(1.4rem,4vw,2.027rem)]">Marketplace</h1>
              <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>500+ products from 120+ verified vendors</p>
            </div>
            <div className="relative w-full sm:w-auto">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "var(--text-dim)" }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search products or vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-card border text-sm w-full sm:w-64 outline-none transition-colors focus:border-accent"
                style={{ background: "var(--surface2)", borderColor: "var(--border-color)", color: "var(--text)" }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-pill text-xs sm:text-sm font-medium border transition-all duration-200"
                style={{
                  borderColor: activeCategory === cat ? "var(--accent-border)" : "var(--border-color)",
                  color: activeCategory === cat ? "var(--accent)" : "var(--text-muted)",
                  background: activeCategory === cat ? "var(--accent-glow)" : "transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="rounded-card border overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
                style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,194,178,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="h-[160px] sm:h-[200px] flex items-center justify-center text-5xl sm:text-6xl relative" style={{ background: "linear-gradient(135deg, var(--surface2), var(--bg))" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(circle at center, rgba(0,194,178,0.08), transparent)" }} />
                  {p.emoji}
                  {p.badge && (
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-md font-mono text-[10px] font-bold" style={{ background: "var(--accent)", color: "var(--bg)" }}>
                      {p.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="absolute top-3 right-3 text-xl transition-transform hover:scale-110"
                  >
                    {wishlist.has(p.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="text-xs mb-1 flex items-center gap-1" style={{ color: "var(--accent)" }}>🏬 {p.vendor}</p>
                  <p className="font-semibold mb-2 text-sm sm:text-base">{p.name}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <span style={{ color: "#F59E0B" }}>{"★".repeat(Math.floor(p.rating))}</span>
                    <span className="text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>{p.rating} ({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm" style={{ color: "var(--accent)" }}>₹{p.price.toLocaleString()}</span>
                      <span className="font-mono text-[10px] sm:text-xs line-through" style={{ color: "var(--text-dim)" }}>₹{p.original.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => handleAdd(p)}
                      className="px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200"
                      style={{ background: "var(--accent)", color: "var(--bg)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 20px rgba(0,194,178,0.3)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-display font-bold text-lg">No products found</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
