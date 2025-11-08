import express from "express";
import { CountTotalBooks, createBook, deleteBook, getBook, updateBook } from "../controller/bookcontroller.js";

const router = express.Router()

 
router.post("/create", createBook);
router.get("/get",getBook)
router.get("/countbooks",CountTotalBooks)
router.delete("/delete/:id", deleteBook);
router.put("/update/:id", updateBook);



export default router;