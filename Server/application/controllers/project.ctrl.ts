import { Response } from "express";
import { ProjectRepository } from "../../infrastructure/repositories/project.repository";
import { ProjectUtil } from "../../infrastructure/utils/project.util";
import { AuthRequest } from "../../infrastructure/middleware/auth.middleware";

export class ProjectController {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  public createProject = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const {
        title,
        description,
        readme,
        proposalFile,
        whitePaper,
        demoLink,
        links,
        investmentStatus,
        isRegistered,
      } = req.body;

      const ownerId = req.user?.userId;

      if (!ownerId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const sanitizedData = ProjectUtil.sanitizeProjectData({
        title,
        description,
        readme,
        proposalFile,
        whitePaper,
        demoLink,
        links,
        investmentStatus: investmentStatus || "self-sponsored",
        isRegistered: isRegistered || false,
        ownerId,
      });

      const validation = ProjectUtil.validateProjectData(sanitizedData);

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        });
        return;
      }

      const newProject = await this.projectRepository.create(sanitizedData);

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: newProject.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getProject = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const project = await this.projectRepository.findById(id);

      if (!project) {
        res.status(404).json({
          success: false,
          message: "Project not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: project.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getAllProjects = async (
    _req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const projects = await this.projectRepository.findAll();
      const projectsData = projects.map((project) => project.toJSON());

      res.status(200).json({
        success: true,
        data: projectsData,
        count: projectsData.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getMyProjects = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const ownerId = req.user?.userId;

      if (!ownerId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const projects = await this.projectRepository.findByOwnerId(ownerId);
      const projectsData = projects.map((project) => project.toJSON());

      res.status(200).json({
        success: true,
        data: projectsData,
        count: projectsData.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public updateProject = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        readme,
        proposalFile,
        whitePaper,
        demoLink,
        links,
        investmentStatus,
        isRegistered,
      } = req.body;

      const ownerId = req.user?.userId;

      const project = await this.projectRepository.findById(id);

      if (!project) {
        res.status(404).json({
          success: false,
          message: "Project not found",
        });
        return;
      }

      if (project.ownerId !== ownerId) {
        res.status(403).json({
          success: false,
          message: "Forbidden: You don't own this project",
        });
        return;
      }

      const sanitizedData = ProjectUtil.sanitizeProjectData({
        title,
        description,
        readme,
        proposalFile,
        whitePaper,
        demoLink,
        links,
        investmentStatus,
        isRegistered,
      });

      const validation = ProjectUtil.validateProjectData({
        ...project,
        ...sanitizedData,
      });

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        });
        return;
      }

      const updatedProject = await this.projectRepository.update(
        id,
        sanitizedData
      );

      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: updatedProject?.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public deleteProject = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const ownerId = req.user?.userId;

      const project = await this.projectRepository.findById(id);

      if (!project) {
        res.status(404).json({
          success: false,
          message: "Project not found",
        });
        return;
      }

      if (project.ownerId !== ownerId) {
        res.status(403).json({
          success: false,
          message: "Forbidden: You don't own this project",
        });
        return;
      }

      await this.projectRepository.softDelete(id);

      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getProjectsByInvestmentStatus = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { status } = req.params;

      const validStatuses = [
        "self-sponsored",
        "looking-for-first-sponsor",
        "looking-for-more-sponsors",
      ];

      if (!validStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          message: "Invalid investment status",
        });
        return;
      }

      const projects = await this.projectRepository.findByInvestmentStatus(
        status
      );
      const projectsData = projects.map((project) => project.toJSON());

      res.status(200).json({
        success: true,
        data: projectsData,
        count: projectsData.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getRegisteredProjects = async (
    _req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const projects = await this.projectRepository.findRegistered();
      const projectsData = projects.map((project) => project.toJSON());

      res.status(200).json({
        success: true,
        data: projectsData,
        count: projectsData.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
