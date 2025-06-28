const adminmodel = require("../models/adminmodels")
var jwt = require('jsonwebtoken');
const orderModel = require("../models/orderModels");
const adminController = {

async login(req, res) {
  const { email, password } = req.body;

  try {
    const admin = await adminmodel.findOne({ email: email });
    if (!admin) {
      return res.send({ msg: "admin does not exist", flag: 0 }); // flag 0 = error
    }

    if (password === admin.password) {
      // Generate JWT token
      const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, { expiresIn: "24h" });

      // ✅ DO NOT SET COOKIE — client will store in localStorage
      return res.send({
        msg: "Login successful",
        flag: 1,
        admin: {
          _id: admin._id,
          email: admin.email,
          name: admin.name,
          // include only what’s needed
        },
        token, // 🟢 frontend will store this in localStorage
      });
    } else {
      return res.send({ msg: "Incorrect password", flag: 0 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ msg: "Internal Server Error", flag: 0 });
  }
},

  async getProductSalesStats(req, res) {
    try {
      const orders = await orderModel.find({ order_status: { $in: [1, 2, 3, 4, 5] } }).populate("product_details.product_id", "name");

      const productStats = {};

      orders.forEach(order => {
        order.product_details.forEach(item => {
          const id = item.product_id?._id?.toString();
          if (!id) return;

          if (!productStats[id]) {
            productStats[id] = {
              name: item.product_id.name || 'Unknown',
              qty: 0,
              revenue: 0
            };
          }

          productStats[id].qty += item.qty;
          productStats[id].revenue += item.total;
        });
      });

      res.send({ flag: 1, data: Object.values(productStats) });

    } catch (err) {
      console.error("Error in getProductSalesStats:", err);
      res.status(500).send({ flag: 0, message: "Internal Server Error" });
    }
  },
  async getSalesOverTime(req, res) {
    try {
      const result = await orderModel.aggregate([
        {
          $match: {
            order_status: { $in: [1, 2, 3, 4, 5] },
          },
        },
        { $unwind: "$product_details" },
        {
          $group: {
            _id: {
              date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            },
            totalQty: { $sum: "$product_details.qty" },
            totalRevenue: { $sum: "$product_details.total" },
          },
        },
        { $sort: { "_id.date": 1 } },
      ]);

      res.send({ flag: 1, data: result });
    } catch (err) {
      console.error("Error in getSalesOverTime:", err);
      res.status(500).send({ flag: 0, message: "Internal Server Error" });
    }
  },
  async getTopProducts(req, res) {
    try {
      const orders = await orderModel.find({ order_status: { $in: [1, 2, 3, 4, 5] } }).populate("product_details.product_id", "name");

      const productStats = {};

      orders.forEach(order => {
        order.product_details.forEach(item => {
          const id = item.product_id?._id?.toString();
          if (!id) return;

          if (!productStats[id]) {
            productStats[id] = {
              name: item.product_id.name || "Unknown",
              qty: 0,
              revenue: 0,
            };
          }

          productStats[id].qty += item.qty;
          productStats[id].revenue += item.total;
        });
      });

      const sorted = Object.values(productStats)
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 5); // top 5 only

      res.send({ flag: 1, data: sorted });
    } catch (err) {
      console.error("Error in getTopProducts:", err);
      res.status(500).send({ flag: 0, message: "Internal Server Error" });
    }
  }

}

module.exports = adminController;