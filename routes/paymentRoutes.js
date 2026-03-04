import { connectDB } from "../db";
import { Router } from "express";
import { createTransaction } from "../controllers/paymentController";

const router = Router();

router.post("/create-transaction", createTransaction);

export default router;