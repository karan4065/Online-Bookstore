import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoute from "./routes/book_route.js"
import userRoute from "./routes/userRoute.js"
import contactroute from './routes/contact_route.js'
import orderroute from './routes/order_route.js'
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//dotenv config file
dotenv.config()
 
const PORT =process.env.PORT || 3000;
 

//connection of mongoDB
try {
    mongoose.connect(process.env.VITE_MongoDBURI);
    console.log("Connected To MongoDB")
} catch (error) {
    console.log("Error : ",error);
}


//routes defining
app.use("/book",bookRoute);
app.use("/user",userRoute);
app.use("/contact",contactroute);
app.use("/product",orderroute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})