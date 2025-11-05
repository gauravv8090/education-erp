import express from "express";
import { cashfreeWebhook, checkStatus, generatePaymentSessionId } from "../controller/cashfreeController.js";

const router = express.Router();

router.post("/", generatePaymentSessionId);
router.get("/checkStatus/:orderId", checkStatus);
router.post("/webhook", cashfreeWebhook);
export default router;
