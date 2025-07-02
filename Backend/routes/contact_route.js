import express from "express"
const router = express.Router();
import { contact } from "../controller/contactcontroller.js";

router.post("/connect",contact)
 

export default router;