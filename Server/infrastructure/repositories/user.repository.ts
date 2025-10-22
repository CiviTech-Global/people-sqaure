import { Repository } from "typeorm";
import { User } from "../../domain/user/user.entity";
import { AppDataSource } from "../database/data-source";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    Object.assign(user, userData);
    return await this.repository.save(user);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async updatePassword(id: string, newPassword: string): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    user.password = newPassword;
    return await this.repository.save(user);
  }
}
