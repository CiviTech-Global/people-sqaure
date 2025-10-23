import { Repository, IsNull } from "typeorm";
import { Project } from "../../domain/project/project.entity";
import { AppDataSource } from "../database/data-source";

export class ProjectRepository {
  private repository: Repository<Project>;

  constructor() {
    this.repository = AppDataSource.getRepository(Project);
  }

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.repository.create(projectData);
    return await this.repository.save(project);
  }

  async findById(id: string): Promise<Project | null> {
    return await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ["owner"],
    });
  }

  async findByOwnerId(ownerId: string): Promise<Project[]> {
    return await this.repository.find({
      where: { ownerId, deletedAt: IsNull() },
      relations: ["owner"],
      order: { createdAt: "DESC" },
    });
  }

  async findAll(): Promise<Project[]> {
    return await this.repository.find({
      where: { deletedAt: IsNull() },
      relations: ["owner"],
      order: { createdAt: "DESC" },
    });
  }

  async update(id: string, projectData: Partial<Project>): Promise<Project | null> {
    const project = await this.findById(id);
    if (!project) return null;

    Object.assign(project, projectData);
    return await this.repository.save(project);
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return result.affected !== 0;
  }

  async restore(id: string): Promise<boolean> {
    const result = await this.repository.restore(id);
    return result.affected !== 0;
  }

  async hardDelete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async findByInvestmentStatus(status: string): Promise<Project[]> {
    return await this.repository.find({
      where: { investmentStatus: status as any, deletedAt: IsNull() },
      relations: ["owner"],
      order: { createdAt: "DESC" },
    });
  }

  async findRegistered(): Promise<Project[]> {
    return await this.repository.find({
      where: { isRegistered: true, deletedAt: IsNull() },
      relations: ["owner"],
      order: { createdAt: "DESC" },
    });
  }
}
