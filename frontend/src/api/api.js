import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getProducts = () => API.get("/products");
export const getCart = () => API.get("/cart");
export const addToCart = (productId, qty = 1) =>
  API.post("/cart", { productId, qty });
export const removeFromCart = (id) => API.delete(`/cart/${id}`);
export const checkout = (data) => API.post("/cart/checkout", data);
