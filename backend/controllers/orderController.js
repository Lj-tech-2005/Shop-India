const OrderModel = require("../models/orderModels");
const CartModel = require("../models/cartModel");

const orderController = {
  async orderPlace(req, res) {
    try {
      const { user_id, order_total, payment_mode, shipping_details } = req.body;

      // Fetch the cart for the user
      const cart = await CartModel.find({ user_id }).populate("product_id");

      if (!cart.length) {
        return res.send({ message: "Cart is empty", flag: 0 });
      }

      // Prepare product details
      const product_details = cart.map((cd) => ({
        product_id: cd.product_id._id,
        qty: cd.qty,
        price: cd.product_id.finalPrice,
        total: cd.product_id.finalPrice * cd.qty
      }));

      // Create new order
      const order = new OrderModel({
        user_id,
        product_details,
        order_total,
        payment_mode,
        shipping_details
      });

      order
        .save()
        .then(async () => {
          await CartModel.deleteMany({ user_id }); // Clear cart
          res.send({
            message: "Order Placed", // 👈 changed from "order place" to "Order Placed"
            order_id: order._id,
            flag: 1
          });
        })
        .catch(() => {
          res.send({
            message: "Order Not Placed",
            flag: 0
          });
        });

    } catch (err) {
      console.log("Order error:", err);
      res.send({
        message: "Something went wrong while placing order",
        flag: 0
      });
    }
  }
};

module.exports = orderController;
