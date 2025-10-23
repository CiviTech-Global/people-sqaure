import { Router } from "express";
import { ProjectController } from "../../application/controllers/project.ctrl";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";

const router = Router();
const projectController = new ProjectController();

// Protected routes - all project routes require authentication
router.post("/", AuthMiddleware.authenticate, projectController.createProject);
router.get("/", AuthMiddleware.authenticate, projectController.getAllProjects);
router.get("/my-projects", AuthMiddleware.authenticate, projectController.getMyProjects);
router.get("/registered", AuthMiddleware.authenticate, projectController.getRegisteredProjects);
router.get(
  "/investment-status/:status",
  AuthMiddleware.authenticate,
  projectController.getProjectsByInvestmentStatus
);
router.get("/:id", AuthMiddleware.authenticate, projectController.getProject);
router.put("/:id", AuthMiddleware.authenticate, projectController.updateProject);
router.delete("/:id", AuthMiddleware.authenticate, projectController.deleteProject);

export default router;
