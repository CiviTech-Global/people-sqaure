import { Response } from "express";
import { ProjectRepository } from "../../infrastructure/repositories/project.repository";
import { ProjectFileRepository } from "../../infrastructure/repositories/projectFile.repository";
import { ProjectUtil } from "../../infrastructure/utils/project.util";
import { AuthRequest } from "../../infrastructure/middleware/auth.middleware";
import { deleteFile } from "../../infrastructure/utils/fileUpload.util";
import { FileType } from "../../domain/projectFile/projectFile.entity";

export class ProjectController {
  private projectRepository: ProjectRepository;
  private projectFileRepository: ProjectFileRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
    this.projectFileRepository = new ProjectFileRepository();
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

      // Handle file uploads if files are present
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      if (files) {
        // Handle proposal file
        if (files.proposal && files.proposal[0]) {
          const file = files.proposal[0];
          await this.projectFileRepository.create({
            projectId: newProject.id,
            originalName: file.originalname,
            fileName: file.filename,
            filePath: `/uploads/${file.filename}`,
            mimeType: file.mimetype,
            fileSize: file.size,
            fileType: "proposal",
          });
        }

        // Handle whitepaper file
        if (files.whitepaper && files.whitepaper[0]) {
          const file = files.whitepaper[0];
          await this.projectFileRepository.create({
            projectId: newProject.id,
            originalName: file.originalname,
            fileName: file.filename,
            filePath: `/uploads/${file.filename}`,
            mimeType: file.mimetype,
            fileSize: file.size,
            fileType: "whitepaper",
          });
        }
      }

      // Fetch project with files
      const projectFiles = await this.projectFileRepository.findByProjectId(
        newProject.id
      );

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: {
          ...newProject.toJSON(),
          files: projectFiles.map((f) => f.toJSON()),
        },
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

      const projectFiles = await this.projectFileRepository.findByProjectId(id);

      res.status(200).json({
        success: true,
        data: {
          ...project.toJSON(),
          files: projectFiles.map((f) => f.toJSON()),
        },
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

      // Fetch files for each project
      const projectsWithFiles = await Promise.all(
        projects.map(async (project) => {
          const files = await this.projectFileRepository.findByProjectId(
            project.id
          );
          return {
            ...project.toJSON(),
            files: files.map((f) => f.toJSON()),
          };
        })
      );

      res.status(200).json({
        success: true,
        data: projectsWithFiles,
        count: projectsWithFiles.length,
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

      // Fetch files for each project
      const projectsWithFiles = await Promise.all(
        projects.map(async (project) => {
          const files = await this.projectFileRepository.findByProjectId(
            project.id
          );
          return {
            ...project.toJSON(),
            files: files.map((f) => f.toJSON()),
          };
        })
      );

      res.status(200).json({
        success: true,
        data: projectsWithFiles,
        count: projectsWithFiles.length,
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

      // Handle new file uploads if files are present
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      if (files) {
        // Handle proposal file
        if (files.proposal && files.proposal[0]) {
          const file = files.proposal[0];

          // Delete old proposal files
          const oldFiles = await this.projectFileRepository.findByProjectIdAndType(
            id,
            "proposal"
          );
          for (const oldFile of oldFiles) {
            deleteFile(oldFile.fileName);
            await this.projectFileRepository.softDelete(oldFile.id);
          }

          // Create new file entry
          await this.projectFileRepository.create({
            projectId: id,
            originalName: file.originalname,
            fileName: file.filename,
            filePath: `/uploads/${file.filename}`,
            mimeType: file.mimetype,
            fileSize: file.size,
            fileType: "proposal",
          });
        }

        // Handle whitepaper file
        if (files.whitepaper && files.whitepaper[0]) {
          const file = files.whitepaper[0];

          // Delete old whitepaper files
          const oldFiles = await this.projectFileRepository.findByProjectIdAndType(
            id,
            "whitepaper"
          );
          for (const oldFile of oldFiles) {
            deleteFile(oldFile.fileName);
            await this.projectFileRepository.softDelete(oldFile.id);
          }

          // Create new file entry
          await this.projectFileRepository.create({
            projectId: id,
            originalName: file.originalname,
            fileName: file.filename,
            filePath: `/uploads/${file.filename}`,
            mimeType: file.mimetype,
            fileSize: file.size,
            fileType: "whitepaper",
          });
        }
      }

      // Fetch updated project with files
      const projectFiles = await this.projectFileRepository.findByProjectId(id);

      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: {
          ...updatedProject?.toJSON(),
          files: projectFiles.map((f) => f.toJSON()),
        },
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

      // Delete associated files
      const projectFiles = await this.projectFileRepository.findByProjectId(id);
      for (const file of projectFiles) {
        deleteFile(file.fileName);
      }
      await this.projectFileRepository.deleteByProjectId(id);

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

      const projectsWithFiles = await Promise.all(
        projects.map(async (project) => {
          const files = await this.projectFileRepository.findByProjectId(
            project.id
          );
          return {
            ...project.toJSON(),
            files: files.map((f) => f.toJSON()),
          };
        })
      );

      res.status(200).json({
        success: true,
        data: projectsWithFiles,
        count: projectsWithFiles.length,
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

      const projectsWithFiles = await Promise.all(
        projects.map(async (project) => {
          const files = await this.projectFileRepository.findByProjectId(
            project.id
          );
          return {
            ...project.toJSON(),
            files: files.map((f) => f.toJSON()),
          };
        })
      );

      res.status(200).json({
        success: true,
        data: projectsWithFiles,
        count: projectsWithFiles.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public uploadFile = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
        return;
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: {
          filename: req.file.filename,
          url: fileUrl,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "File upload failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public deleteUploadedFile = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { filename } = req.params;

      if (!filename) {
        res.status(400).json({
          success: false,
          message: "Filename is required",
        });
        return;
      }

      deleteFile(filename);

      res.status(200).json({
        success: true,
        message: "File deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "File deletion failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public downloadFile = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { fileId } = req.params;

      const file = await this.projectFileRepository.findById(fileId);

      if (!file) {
        res.status(404).json({
          success: false,
          message: "File not found",
        });
        return;
      }

      // Verify user has access to this file's project
      const project = await this.projectRepository.findById(file.projectId);
      if (!project) {
        res.status(404).json({
          success: false,
          message: "Project not found",
        });
        return;
      }

      const path = require("path");
      const filePath = path.join(
        __dirname,
        "../../uploads",
        file.fileName
      );

      res.download(filePath, file.originalName, (err) => {
        if (err) {
          console.error("Download error:", err);
          if (!res.headersSent) {
            res.status(500).json({
              success: false,
              message: "File download failed",
            });
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "File download failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
