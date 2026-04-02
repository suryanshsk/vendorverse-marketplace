import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Dashboard from "@/pages/Dashboard";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <ToastProvider>
        <Navbar />
        <CartDrawer />
        <main className="relative z-[1]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ToastProvider>
    </CartProvider>
  </BrowserRouter>
);

export default App;
