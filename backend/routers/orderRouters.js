const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController")


orderRouter.post('/order-place', orderController.orderPlace);
orderRouter.post('/success', orderController.orderSuccess);
orderRouter.post('/Failed', orderController.orderFailed);
orderRouter.get('/getUserOrder/:user_id', orderController.getUserOrder);
module.exports = orderRouter;