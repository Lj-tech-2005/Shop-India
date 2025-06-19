const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController")


orderRouter.post('/order-place', orderController.orderPlace);
orderRouter.post('/success', orderController.orderSuccess);
module.exports = orderRouter;