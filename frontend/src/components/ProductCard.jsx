export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border border-gray-300 rounded-lg shadow hover:shadow-lg transition-all bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-contain rounded-t-lg p-2"
      />
      <div className="p-4 space-y-2">
        <h2 className="font-semibold text-gray-800">{product.name}</h2>
        <p className="text-lg font-bold text-blue-600">₹{product.price}</p>
        <button
          onClick={() => onAdd(product._id, 1)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
