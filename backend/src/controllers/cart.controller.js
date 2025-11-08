import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res) => {
  try {
    const items = await Cart.find().populate("productId"); // make sure productId references Product

    const totalPrice = items.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );

    res.json({
      success: true,
      items,
      totalPrice,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch cart" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    // Find existing item
    let existing = await Cart.findOne({ productId });

    // If item already exists
    if (existing) {
      existing.qty += qty;

      // If resulting quantity <= 0 → remove item
      if (existing.qty <= 0) {
        await Cart.deleteOne({ _id: existing._id });
        return res.json({ message: "Item removed from cart" });
      }

      await existing.save();
      return res.json({ message: `Cart updated ` });
    }

    // If item doesn't exist and qty > 0 → create new one
    if (qty > 0) {
      await Cart.create({ productId, qty });
      return res.json({ message: "Item added to cart" });
    }

    // qty <= 0 and no existing item → ignore
    return res.status(400).json({ message: "Invalid quantity" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};

export const checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.qty,
      0
    );

    const receipt = {
      orderId:
        "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      total,
      timestamp: new Date().toISOString(),
    };
    await Cart.deleteMany({});
    res.json({
      success: true,
      message: "Checkout successful",
      receipt,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Checkout failed",
      error: err.message,
    });
  }
};
