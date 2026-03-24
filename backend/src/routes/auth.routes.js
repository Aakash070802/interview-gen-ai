import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const router = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
router.route("/register").post(registerController);

/**
 * @route POST /api/auth/login
 * @description login a user
 * @access Public
 */
router.route("/login").post(loginController);
export default router;
