import { Router } from "express";
import { ProjectController } from "../../application/controllers/project.ctrl";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";
import { upload } from "../../infrastructure/utils/fileUpload.util";

const router = Router();
const projectController = new ProjectController();

// Protected routes - all project routes require authentication
router.post(
  "/",
  AuthMiddleware.authenticate,
  upload.fields([
    { name: "proposal", maxCount: 1 },
    { name: "whitepaper", maxCount: 1 },
  ]),
  projectController.createProject
);
router.get("/", AuthMiddleware.authenticate, projectController.getAllProjects);
router.get("/my-projects", AuthMiddleware.authenticate, projectController.getMyProjects);
router.get("/registered", AuthMiddleware.authenticate, projectController.getRegisteredProjects);
router.get(
  "/investment-status/:status",
  AuthMiddleware.authenticate,
  projectController.getProjectsByInvestmentStatus
);

// File upload routes
router.post(
  "/upload",
  AuthMiddleware.authenticate,
  upload.single("file"),
  projectController.uploadFile
);
router.delete(
  "/upload/:filename",
  AuthMiddleware.authenticate,
  projectController.deleteUploadedFile
);

// File download route
router.get(
  "/file/:fileId/download",
  AuthMiddleware.authenticate,
  projectController.downloadFile
);

router.get("/:id", AuthMiddleware.authenticate, projectController.getProject);
router.put(
  "/:id",
  AuthMiddleware.authenticate,
  upload.fields([
    { name: "proposal", maxCount: 1 },
    { name: "whitepaper", maxCount: 1 },
  ]),
  projectController.updateProject
);
router.delete("/:id", AuthMiddleware.authenticate, projectController.deleteProject);

export default router;
