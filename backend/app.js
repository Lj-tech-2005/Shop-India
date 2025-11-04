require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const categoryrouter = require("./routers/categoryrouters");
const colorrouter = require("./routers/colorrouter");
const productrouter = require("./routers/productrouters");
const adminrouters = require("./routers/adminrouters");
const userRouters = require('./routers/userRouters');
const CartRouter = require('./routers/cartRouter');
const brandRouter = require('./routers/brandeouter');
const orderRouter = require('./routers/orderRouters');
const wishlistRoutes = require('./routers/wishlistrouters');
const usercontactrouters = require('./routers/usercontactrouters');

const server = express();

server.use(express.json());
server.use(cookieParser());

const allowedOrigins = [
  "https://shop-india-nine.vercel.app",
  "http://localhost:3000"
];

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

server.use("/category", categoryrouter);
server.use("/color", colorrouter);
server.use("/product", productrouter);
server.use("/admin", adminrouters);
server.use("/user", userRouters);
server.use(express.static("public"));
server.use("/cart", CartRouter);
server.use("/brand", brandRouter);
server.use("/order", orderRouter);
server.use("/wishlist", wishlistRoutes);
server.use("/contact", usercontactrouters);

server.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

let isConnected = false; // <--- add this flag

async function connectDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Shop-india",
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectDB(); // call it once, not per request
