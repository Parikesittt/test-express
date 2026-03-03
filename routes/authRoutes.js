import { Router } from "express";
import { login, register, requestReset, resetPassword } from "../controllers/authController.js";
import { validateLogin, validateRegister } from "../middlewares/validateAuth.js";
import { authenticateJWT } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/reset-password", requestReset);
router.post("/reset-password/:token", resetPassword);

export default router;