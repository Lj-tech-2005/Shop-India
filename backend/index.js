
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");
server.use(express.json()); 
server.use(cors({ origin: "http://localhost:3000" }));
const categoryrouter = require("./routers/categoryrouters");
const colorrouter=require("./routers/colorrouter");
const productrouter = require("./routers/productrouters");
server.use("/category", categoryrouter)
server.use("/color",colorrouter)
server.use("/product",productrouter)
server.use(express.static("public"))



mongoose.connect("mongodb://localhost:27017/", { dbName: "ISHOP" }).then(


    () => {

        console.log("monngodb is connected succesfully")

        server.listen(

            5000,
            () => {
                console.log("server is running on http://localhost:5000");

            }

        )

    }

).catch(

    (err) => {

        console.log("mongodb connection error:", err)

    }
)


