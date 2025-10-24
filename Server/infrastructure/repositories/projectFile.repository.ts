import { AppDataSource } from "../database/data-source";
import { ProjectFile, FileType } from "../../domain/projectFile/projectFile.entity";
import { ICreateProjectFile, IUpdateProjectFile } from "../../domain/projectFile/projectFile.model";

export class ProjectFileRepository {
  private repository = AppDataSource.getRepository(ProjectFile);

  public async create(data: ICreateProjectFile): Promise<ProjectFile> {
    const projectFile = this.repository.create(data);
    return await this.repository.save(projectFile);
  }

  public async findById(id: string): Promise<ProjectFile | null> {
    return await this.repository.findOne({
      where: { id, deletedAt: null },
    });
  }

  public async findByProjectId(projectId: string): Promise<ProjectFile[]> {
    return await this.repository.find({
      where: { projectId, deletedAt: null },
      order: { createdAt: "DESC" },
    });
  }

  public async findByProjectIdAndType(
    projectId: string,
    fileType: FileType
  ): Promise<ProjectFile[]> {
    return await this.repository.find({
      where: { projectId, fileType, deletedAt: null },
      order: { createdAt: "DESC" },
    });
  }

  public async update(
    id: string,
    data: IUpdateProjectFile
  ): Promise<ProjectFile | null> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  public async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  public async hardDelete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async deleteByProjectId(projectId: string): Promise<void> {
    await this.repository.softDelete({ projectId });
  }
}
