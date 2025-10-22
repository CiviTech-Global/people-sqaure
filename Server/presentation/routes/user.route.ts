import { Router } from "express";
import { UserController } from "../../application/controllers/user.ctrl";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";

const router = Router();
const userController = new UserController();

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

// Protected routes
router.get("/:id", AuthMiddleware.authenticate, userController.getUser);
router.put("/:id", AuthMiddleware.authenticate, userController.updateUser);
router.get("/", AuthMiddleware.authenticate, userController.getAllUsers);

export default router;
