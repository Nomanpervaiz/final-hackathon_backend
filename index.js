import express from "express"
import cors from "cors";
import  mongoose from "mongoose";
import "dotenv/config";
import router from "./routes/index.js";


// express ek framwork hai node.js ka jo humye achi efficeny or easy routing or middleware provide karrha hai..
const app  = express()
const PORT  = process.env.PORT || 7777

// cors frontend se server connection maintain karrha hai..
app.use(cors())
app.use(express.json())


// yeaha mongoDB se connect kiya jarha hai..
mongoose
 .connect(process.env.MONGODB_URI)
 .then(() => console.log("Connected to MongoDB"))
 .catch((err) => console.log("error in connecting to MongoDB" , err))

// get route call hurha hai for main page
app.get("/", (req, res) => res.send(new Date()));  
// router ek object hai jo hum apne routes ko define karrha hai..
app.use("/api" , router )
// server run krrha hai
app.listen(PORT , () => console.log("server connected to port " + PORT))
