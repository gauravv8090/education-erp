import express from "express";
import { adminLogin, getTransactions } from "../controller/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/transactions", getTransactions);

export default router;
