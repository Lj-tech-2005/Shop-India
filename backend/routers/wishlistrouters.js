const express = require("express");
const wishlistrouters = express.Router();
const wishlistcontroller = require("../controllers/wishlistcontroller");

wishlistrouters.post("/add", wishlistcontroller.add);
wishlistrouters.post("/remove", wishlistcontroller.remove);
wishlistrouters.post("/check", wishlistcontroller.check);
wishlistrouters.get("/list/:userId", wishlistcontroller.list);


module.exports = wishlistrouters;