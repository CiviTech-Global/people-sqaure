import { FileType } from "./projectFile.entity";

export interface IProjectFile {
  id?: string;
  projectId: string;
  originalName: string;
  fileName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
  fileType: FileType;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ICreateProjectFile {
  projectId: string;
  originalName: string;
  fileName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
  fileType: FileType;
  description?: string;
}

export interface IUpdateProjectFile {
  description?: string;
}
