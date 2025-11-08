import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state?.receipt;

  if (!receipt)
    return (
      <div className="text-center p-10">
        <p className="text-gray-500">No order found.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-md mt-3"
        >
          Back to Home
        </button>
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        ✅ Order Successful!
      </h2>
      <p>Order ID: <strong>{receipt.orderId}</strong></p>
      <p>Total: ₹{receipt.total}</p>
      <p>Date: {new Date(receipt.timestamp).toLocaleString()}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
}
