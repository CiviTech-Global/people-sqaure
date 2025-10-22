import { Router } from "express";
import { UserController } from "../../application/controllers/user.ctrl";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.get("/", userController.getAllUsers);

export default router;
