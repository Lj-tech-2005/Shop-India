const express = require("express");
const adminrouters = express.Router();
const adminController = require("../controllers/adminController")



adminrouters.post("/login", adminController.login);
adminrouters.get("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});
adminrouters.get("/product-sales-stats", adminController.getProductSalesStats);
adminrouters.get("/sales-over-time", adminController.getSalesOverTime);
adminrouters.get("/top-products", adminController.getTopProducts);




module.exports = adminrouters;