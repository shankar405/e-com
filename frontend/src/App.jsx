import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import CheckoutPage from "./components/CheckoutPage";
export default function App() {
  return (
    <BrowserRouter>
      <nav className=" bg-gray-800 text-white p-4 flex justify-between px-6">
        <Link to="/" className="font-bold text-2xl">VibeCommerce</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
