import express from "express";
import { order, getAllOrders, cancelOrder, updateOrderStatus } from "../controller/ordercontroller.js"; // adjust path if needed

const router = express.Router();

router.post("/order", order);
router.get("/orders", getAllOrders);

// match frontend calls: PATCH /product/orders/:id and DELETE /product/orders/:id
router.patch("/orders/:id", updateOrderStatus);
router.delete("/orders/:id", cancelOrder);

export default router;