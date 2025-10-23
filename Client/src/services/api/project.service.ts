import { apiClient } from "./axios.config";

export interface ProjectLinks {
  github?: string;
  linkedin?: string;
  website?: string;
  demo?: string;
  other?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  readme?: string;
  proposalFile?: string;
  whitePaper?: string;
  demoLink?: string;
  links?: ProjectLinks;
  investmentStatus:
    | "self-sponsored"
    | "looking-for-first-sponsor"
    | "looking-for-more-sponsors";
  isRegistered: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  readme?: string;
  proposalFile?: string;
  whitePaper?: string;
  demoLink?: string;
  links?: ProjectLinks;
  investmentStatus?:
    | "self-sponsored"
    | "looking-for-first-sponsor"
    | "looking-for-more-sponsors";
  isRegistered?: boolean;
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
    const response = await apiClient.post<ProjectResponse>(
      "/api/projects",
      data
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
    const response = await apiClient.put<ProjectResponse>(
      `/api/projects/${id}`,
      data
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
}
