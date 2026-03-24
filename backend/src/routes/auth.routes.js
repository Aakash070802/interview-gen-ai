import { Router } from "express";
import {
  getUserDetails,
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

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

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add token in blacklist
 * @access Private
 */
router.route("/logout").get(authMiddleware, logoutController);

/**
 * @route GET /api/auth/get-me
 * @description fetch user details and return
 * @access Private
 */
router.route("/get-me").get(authMiddleware, getUserDetails);
export default router;
