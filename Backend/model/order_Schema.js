import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },   
    number: { type: String, required: true },  
    address: { type: String, required: true },
    bookName: { type: String, required: true },
    payment: { type: String, required: true },
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
})

const Order = mongoose.model("Order",OrderSchema)
export default Order;