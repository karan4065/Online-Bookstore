import express from "express"
import { signup ,login, userLogout } from "../controller/usercontrol.js";

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout", userLogout);

 

export default router;
