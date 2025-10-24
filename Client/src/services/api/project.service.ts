import { apiClient } from "./axios.config";

export interface ProjectLinks {
  github?: string;
  linkedin?: string;
  website?: string;
  demo?: string;
  other?: string[];
}

export interface ProjectFile {
  id: string;
  projectId: string;
  originalName: string;
  fileName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
  fileType: "proposal" | "whitepaper" | "other";
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  readme?: string;
  demoLink?: string;
  links?: ProjectLinks;
  investmentStatus:
    | "self-sponsored"
    | "looking-for-first-sponsor"
    | "looking-for-more-sponsors";
  isRegistered: boolean;
  ownerId: string;
  files?: ProjectFile[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  readme?: string;
  demoLink?: string;
  links?: ProjectLinks;
  investmentStatus?:
    | "self-sponsored"
    | "looking-for-first-sponsor"
    | "looking-for-more-sponsors";
  isRegistered?: boolean;
  proposalFile?: File;
  whitepaperFile?: File;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {}

export interface ProjectResponse {
  success: boolean;
  message?: string;
  data: Project;
}

export interface ProjectsResponse {
  success: boolean;
  data: Project[];
  count: number;
}

export class ProjectService {
  public static async createProject(
    data: CreateProjectData
  ): Promise<ProjectResponse> {
    const formData = new FormData();

    // Append text fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.readme) formData.append("readme", data.readme);
    if (data.demoLink) formData.append("demoLink", data.demoLink);
    if (data.links) formData.append("links", JSON.stringify(data.links));
    if (data.investmentStatus)
      formData.append("investmentStatus", data.investmentStatus);
    formData.append("isRegistered", String(data.isRegistered || false));

    // Append files
    if (data.proposalFile) {
      formData.append("proposal", data.proposalFile);
    }
    if (data.whitepaperFile) {
      formData.append("whitepaper", data.whitepaperFile);
    }

    const response = await apiClient.post<ProjectResponse>(
      "/api/projects",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public static async getMyProjects(): Promise<ProjectsResponse> {
    const response = await apiClient.get<ProjectsResponse>(
      "/api/projects/my-projects"
    );
    return response.data;
  }

  public static async getAllProjects(): Promise<ProjectsResponse> {
    const response = await apiClient.get<ProjectsResponse>("/api/projects");
    return response.data;
  }

  public static async getProjectById(id: string): Promise<ProjectResponse> {
    const response = await apiClient.get<ProjectResponse>(
      `/api/projects/${id}`
    );
    return response.data;
  }

  public static async updateProject(
    id: string,
    data: UpdateProjectData
  ): Promise<ProjectResponse> {
    const formData = new FormData();

    // Append text fields
    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.readme !== undefined) formData.append("readme", data.readme);
    if (data.demoLink !== undefined) formData.append("demoLink", data.demoLink);
    if (data.links) formData.append("links", JSON.stringify(data.links));
    if (data.investmentStatus)
      formData.append("investmentStatus", data.investmentStatus);
    if (data.isRegistered !== undefined)
      formData.append("isRegistered", String(data.isRegistered));

    // Append files
    if (data.proposalFile) {
      formData.append("proposal", data.proposalFile);
    }
    if (data.whitepaperFile) {
      formData.append("whitepaper", data.whitepaperFile);
    }

    const response = await apiClient.put<ProjectResponse>(
      `/api/projects/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public static async deleteProject(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete(`/api/projects/${id}`);
    return response.data;
  }

  public static async getRegisteredProjects(): Promise<ProjectsResponse> {
    const response = await apiClient.get<ProjectsResponse>(
      "/api/projects/registered"
    );
    return response.data;
  }

  public static async getProjectsByInvestmentStatus(
    status: string
  ): Promise<ProjectsResponse> {
    const response = await apiClient.get<ProjectsResponse>(
      `/api/projects/investment-status/${status}`
    );
    return response.data;
  }

  public static async uploadFile(
    file: File
  ): Promise<{
    success: boolean;
    message: string;
    data: { filename: string; url: string; size: number; mimetype: string };
  }> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/api/projects/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public static async deleteFile(filename: string): Promise<void> {
    await apiClient.delete(`/api/projects/upload/${filename}`);
  }

  public static async downloadFile(fileId: string, originalName: string): Promise<void> {
    const response = await apiClient.get(`/api/projects/file/${fileId}/download`, {
      responseType: "blob",
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", originalName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
}
