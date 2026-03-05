import { Router } from "express";
import { createTransaction, checkPaymentStatus, handleNotification } from "../controllers/paymentController.js";

const router = Router();

router.post("/create-transaction", createTransaction);
router.get("/status/:orderId", checkPaymentStatus);
router.post("/notification", handleNotification);

export default router;