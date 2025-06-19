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
      return res.send({ msg: "order not found", flag: 0 });
    }

    const user = await userModels.findById(user_id);
    if (!user) {
      return res.send({ msg: "user not found", flag: 0 });
    }

    if (order.order_status === 1) {
      return res.send({ msg: "order already paid", flag: 0 });
    }

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(order.razorpay_order_id + "|" + razorpay_response.razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_response.razorpay_signature) {
      return res.send({ msg: "payment verification failed", flag: 0 });
    }

    order.order_status = 1;
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
    return res.send({ msg: "internal server error", flag: 0 });
  }
}

};


module.exports = orderController;
