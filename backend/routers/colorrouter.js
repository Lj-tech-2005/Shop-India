

const express = require("express");
const colorrouter = express.Router();

const colorcontroller = require("../controllers/colorcontrollers")


colorrouter.post("/create", colorcontroller.create);
colorrouter.get("/:id?", colorcontroller.read);
colorrouter.delete("/delete/:id", colorcontroller.delete);
colorrouter.patch("/status/:id", colorcontroller.status);
colorrouter.put("/update/:id", colorcontroller.update);







module.exports = colorrouter;