const OrderModel = require("../models/orderModels");
const CartModel = require("../models/cartModel");
const Rozorpay = require("razorpay");
const orderModel = require("../models/orderModels");
const userModels = require("../models/userModels")
const crypto = require("crypto")
const razorpay_instance = new Rozorpay({

  key_id: process.env.RAZORPAY_KEY_id,
  key_secret: process.env.RAZORPAY_KEY_SECRET

})


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

      await order.save();

      // COD
      if (payment_mode == 0) {
        await CartModel.deleteMany({ user_id }); // Clear cart
        return res.send({
          message: "Order Placed successfully",
          order_id: order._id,
          flag: 1
        });
      }

      // Razorpay
      razorpay_instance.orders.create(
        {
          receipt: order._id.toString(),
          amount: Number(order_total) * 100, // amount in paise
          currency: "INR"
        },
        async (error, razorpay_order) => {
          if (error) {
            console.error("Razorpay error:", error);
            return res.send({ message: "Unable to initiate payment", flag: 0 });
          }

          order.razorpay_order_id = razorpay_order.id;
          await order.save();

          res.send({
            flag: 1,
            order_id: order._id,
            razorpay_order_id: razorpay_order.id,
            amount: Number(order_total) * 100 // send amount for frontend
          });
        }
      );
    } catch (err) {
      console.log("Order error:", err);
      res.send({
        message: "Something went wrong while placing order",
        flag: 0
      });
    }
  },
  async orderSuccess(req, res) {
    try {
      const { order_id, user_id, razorpay_response } = req.body;

      const order = await orderModel.findById(order_id);
      if (!order) {
        return res.send({ message: "order not found", flag: 0 });
      }

      const user = await userModels.findById(user_id);
      if (!user) {
        return res.send({ message: "user not found", flag: 0 });
      }

      if (order.order_status === 1) {
        return res.send({ message: "order already paid", flag: 0 });
      }

      const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(order.razorpay_order_id + "|" + razorpay_response.razorpay_payment_id)
        .digest("hex");

      if (generated_signature !== razorpay_response.razorpay_signature) {
        return res.send({ message: "payment verification failed", flag: 0 });
      }

      order.order_status = 1;
      order.payment_status = 'success';
      order.razorpay_payment_id = razorpay_response.razorpay_payment_id;

      await order.save();
      await CartModel.deleteMany({ user_id });

      return res.send({
        message: "Order Placed successfully",
        order_id: order._id,
        flag: 1
      });
    } catch (error) {
      console.error("orderSuccess error:", error); // log for debugging
      return res.send({ message: "internal server error", flag: 0 });
    }
  },
  async orderFailed(req, res) {
    try {
      const { order_id, user_id } = req.body;

      const order = await orderModel.findById(order_id);
      if (!order) {
        return res.send({ message: "order not found", flag: 0 });
      }

      if (!order.user_id.equals(user_id)) {
        return res.send({ message: "unauthorized user", flag: 0 });
      }

      // If already marked failed, skip update
      if (order.payment_status === 'failed') {
        return res.send({ message: "order already marked as failed", flag: 0 });
      }

      order.payment_status = 'failed';
      order.order_status = 6; // Assuming 6 = payment failed/cancelled
      await order.save();

      return res.send({ message: "Order marked as failed", flag: 1 });
    } catch (error) {
      console.error("orderFailed error:", error);
      return res.send({ message: "internal server error", flag: 0 });
    }
  },
  async getUserOrder(req, res) {
    try {
      const { user_id } = req.params;

      const orders = await orderModel
        .find({ user_id })
        .sort({ createdAt: -1 })
        .populate("product_details.product_id", "name thumbnail"); // ✅ यहीं से name और image आएगा

      if (orders.length === 0) {
        return res.send({ message: "No orders found", flag: 0 });
      }

      res.send({ message: "Orders fetched successfully", flag: 1, orders });
    } catch (error) {
      console.log(error)
      console.error("Error in getUserOrders:", error.message);
      res.send({ message: "Internal server error", flag: 0 });
    }
  },
  async cancelOrder(req, res) {
    try {
      const { order_id, user_id, reason } = req.body;

      const order = await orderModel.findById(order_id);
      if (!order) return res.send({ message: "Order not found", flag: 0 });
      if (!order.user_id.equals(user_id)) return res.send({ message: "Unauthorized user", flag: 0 });
      if (Number(order.payment_mode) !== 0) return res.send({ message: "Only COD orders can be cancelled", flag: 0 });
      if (![0, 1].includes(order.order_status)) return res.send({ message: "Order cannot be cancelled at this stage", flag: 0 });

      order.order_status = 6;
      order.payment_status = "cancelled";

      // 🔴 Optional: Save cancellation reason (only if you add field in model)
      order.cancel_reason = reason || "Not specified";

      await order.save();

      return res.send({ message: "Order cancelled successfully", flag: 1 });
    } catch (error) {
      console.error("cancelOrder error:", error);
      return res.send({ message: "Internal server error", flag: 0 });
    }
  },

  async returnOrder(req, res) {
    try {
      const { order_id, user_id } = req.body;

      const order = await orderModel.findById(order_id);
      if (!order) {
        return res.send({ message: "Order not found", flag: 0 });
      }

      if (!order.user_id.equals(user_id)) {
        return res.send({ message: "Unauthorized user", flag: 0 });
      }

      // Only allow return if order is delivered
      if (order.order_status !== 5) {
        return res.send({ message: "Only delivered orders can be returned", flag: 0 });
      }

      order.order_status = 7; // Returned
      await order.save();

      return res.send({ message: "Return request submitted", flag: 1 });
    } catch (error) {
      console.error("returnOrder error:", error);
      return res.send({ message: "Internal server error", flag: 0 });
    }
  },
  


};


module.exports = orderController;
