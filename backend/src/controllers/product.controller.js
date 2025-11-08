import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// (Optional) for seeding initial data
export const seedProducts = async (req, res) => {
  await Product.deleteMany({});
  await Product.insertMany([
    {
      name: "Apple MacBook Air M2",
      price: 95000,
      image: "https://i3-prod-assets.indiaistore.com/files/uploads/products/pdp/macbook-air-m2-33cm-starlight/pdp_1701424651_3319.png",
    },
    {
      name: "Sony WH-1000XM5 Headphones",
      price: 29990,
      image: "https://www.sony.co.in/image/cb6bff7884c779ebd2c5a3f1f297daec?fmt=png-alpha&wid=1578&hei=1050&bgcolor=F6F9FF",
    },
    {
      name: "Logitech MX Master 3 Mouse",
      price: 7499,
      image: "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-graphite-new-1.png",
    },
    {
      name: "Keychron K6 Wireless Keyboard",
      price: 6900,
      image: "https://keychron.in/wp-content/uploads/2021/12/Keychron-K6-hot-swappable-compact-65-percent-wireless-mechanical-keyboard-for-Mac-Windows-iOS-Gateron-switch-red-with-type-C-RGB-white-backlight_7f5684b8-e1be-4a8c-a0b7-3d0d8c22535b_1800x1800-1-900x900.jpg",
    },
    {
      name: "iPhone 15 Pro",
      price: 134900,
      image: "https://i3-prod-assets.indiaistore.com/files/uploads/products/pdp/iphone-15-black/pdp_1694689212_0412.png",
    },
    {
      name: "Samsung Galaxy S24",
      price: 109999,
      image: "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-s24/buy/S24-Color-Cobalt_Violet_PC_0527_final.jpg?imbypass=true",
    },
    {
      name: "Apple Watch Series 11",
      price: 46999,
      image: "https://i3-prod-assets.indiaistore.com/files/uploads/products/pdp/apple-watch-series-11-space-grey/pdp_1757916135_291.png",
    },
    {
      name: "Amazon Echo Dot (5th Gen)",
      price: 5499,
      image: "https://www.jiomart.com/images/product/original/493711733/amazon-echo-dot-5th-gen-smart-speaker-2023-black-digital-o493711733-p598989351-0-202303021808.jpeg?im=Resize=(420,420)",
    },
    {
      name: "Dell 27-inch 4K Monitor",
      price: 28999,
      image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/s-series/s2725qc/media-gallery/monitor-s2725qc-gray-gallery-2.psd?qlt=90,0&op_usm=1.75,0.3,2,0&resMode=sharp&pscan=auto&fmt=png-alpha&hei=500",
    },
    {
      name: "Anker PowerCore 10000mAh Power Bank",
      price: 2499,
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:450/A4-j7hdWGK-anker-a1266h11-power-banks-491420251-i-1-1200wx1200h.jpeg",
    },
  ]);

  res.json({ message: "✅ 10 Products seeded successfully!" });
};

