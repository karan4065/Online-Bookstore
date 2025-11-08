import express from "express"
const router = express.Router();
import { adminLogin } from "../controller/admincontroller.js";

router.post("/login",adminLogin)

export default router;
