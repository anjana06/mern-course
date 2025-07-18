import { Router } from "express";
import { register,login, logout } from "../controllers/authController.js";
import { validateRegisterInput,validateLoginInput } from "../middleware/validatationMiddleware.js";

const router = Router()

router.route("/register").post(validateRegisterInput,register);
router.route("/login").post(validateLoginInput,login);
router.route("/logout").get(logout)

export default router