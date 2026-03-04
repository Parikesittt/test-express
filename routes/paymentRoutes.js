import { Router } from "express";
import { createTransaction } from "../controllers/paymentController.js";

const router = Router();

router.post("/create-transaction", createTransaction);

export default router;