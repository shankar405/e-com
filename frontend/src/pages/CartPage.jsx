import { useState, useEffect } from "react";
import { getCart, checkout, addToCart, removeFromCart } from "../api/api";
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data.items || []);
      setTotal(res.data.totalPrice || 0);
    } catch {
      toast.error("Failed to load cart");
    }
  };


const handleQuantityChange = async (item, action) => {
  try {
    let change = 0;

    if (action === "inc") change = 1;
    if (action === "dec") change = -1;
    if (action === "remove") change = -item.qty; // remove all quantity

    await addToCart(item.productId._id, change);

    if (action === "remove") {
      toast.success(`${item.productId.name} removed from cart`);
    } else if (action === "inc") {
      toast.success(`Cart Updated`);
    } else {
      toast.success(`Cart Updated`);
    }

    await fetchCart();
  } catch (err) {
    console.error(err);
    toast.error("Failed to update cart");
  }
};



  const handleCheckout = async () => {
    try {
      const res = await checkout({ cartItems: cart });
      toast.success(res.data.message);
      setReceipt(res.data.receipt);
      setCart([]);
    } catch {
      toast.error("Checkout failed");
    }
  };

  if (receipt) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Order Success!</h2>
        <p>Order ID: <strong>{receipt.orderId}</strong></p>
        <p>Total: ₹{receipt.total}</p>
        <p>Date: {new Date(receipt.timestamp).toLocaleString()}</p>
        <button
          onClick={() => setReceipt(null)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => {
              const product = item.productId;
              return (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{product?.name}</h3>
                      <p className="text-gray-600">₹{product?.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                        disabled={item.qty <= 1}
                          onClick={() => handleQuantityChange(item, "dec")}
                          className="px-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => handleQuantityChange(item, "inc")}
                          className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ₹{product?.price * item.qty}
                    </p>
                    <button
                      onClick={() => handleQuantityChange(item, "remove")}
                      className="text-red-500 hover:text-red-700 mt-2 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h3 className="text-xl font-bold">Total: ₹{total}</h3>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
