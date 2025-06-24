const adminmodel = require("../models/adminmodels")
var jwt = require('jsonwebtoken');
const orderModel = require("../models/orderModels");
const adminController = {

  async login(req, res) {

    const { email, password } = req.body

    try {
      const admin = await adminmodel.findOne({ email: email });
      if (!admin) {
        res.send({ msg: "admin is not exist", flag: 1 });

      }

      if (password === admin.password) {
        var token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, { expiresIn: "24h" });
        res.cookie("admin_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // ✅ true on Render
          sameSite: "none", // ✅ REQUIRED for cross-origin cookies
          path: "/",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.send({ msg: "login successfully", flag: 1, admin: { ...admin.toJSON(), password: "", token } });

      } else {

        res.send({ msg: "incorrect password", flag: 0 });

      }

    } catch (error) {

      res.status(500).send({ msg: 'Internal Server Error', flag: 0 });

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