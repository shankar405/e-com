import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api/api";
import ProductCard from "../components/ProductCard";
import { toast } from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getProducts();
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const res = await addToCart(productId, 1);
      toast.success(res.data.message || "Added to cart 🛒");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  if (loading) return <p className="text-gray-500 text-center">Loading products...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">🛍 Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={() => handleAddToCart(p._id)} />
        ))}
      </div>
    </div>
  );
}
