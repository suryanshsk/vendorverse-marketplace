import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, changeQty, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    clearCart();
    showToast("🎉 Order placed successfully!");
    toggleCart();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[100]"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
        onClick={toggleCart}
      />
      <div
        className="fixed right-0 z-[101] flex flex-col border-l w-full sm:w-[400px]"
        style={{
          top: 68,
          maxHeight: "calc(100vh - 68px)",
          background: "var(--bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b sticky top-0 z-10" style={{ borderColor: "var(--border-color)", background: "var(--bg)" }}>
          <h2 className="font-display font-extrabold text-lg">Your Cart 🛒</h2>
          <button onClick={toggleCart} className="text-vtext-muted hover:text-vtext transition-colors text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {cart.length === 0 ? (
            <p className="text-center py-20" style={{ color: "var(--text-muted)" }}>Your cart is empty</p>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-3 rounded-card border" style={{ borderColor: "var(--border-color)", background: "var(--surface)" }}>
                  <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-[10px] flex items-center justify-center text-xl sm:text-2xl flex-shrink-0" style={{ background: "var(--surface2)" }}>
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.vendor}</p>
                    <p className="font-mono font-bold text-sm" style={{ color: "var(--accent)" }}>₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      className="w-7 h-7 rounded-md flex items-center justify-center border text-sm font-bold transition-colors hover:border-accent"
                      style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                    >
                      −
                    </button>
                    <span className="font-mono text-sm w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      className="w-7 h-7 rounded-md flex items-center justify-center border text-sm font-bold transition-colors hover:border-accent"
                      style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t sticky bottom-0" style={{ borderColor: "var(--border-color)", background: "var(--bg)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>Total</span>
              <span className="font-display font-extrabold text-xl" style={{ color: "var(--accent)" }}>₹{cartTotal.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-card font-bold text-sm transition-all duration-200"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-hover)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(138,90,60,0.24)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
