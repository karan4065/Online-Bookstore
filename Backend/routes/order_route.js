import express from "express"
const router = express.Router();
import { order } from "../controller/ordercontroller.js";

router.post("/order",order)
 

export default router;