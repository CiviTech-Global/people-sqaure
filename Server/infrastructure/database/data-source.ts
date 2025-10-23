import { DataSource } from "typeorm";
import { User } from "../../domain/user/user.entity";
import { Project } from "../../domain/project/project.entity";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "1377",
  database: process.env.DB_NAME || "people_square",
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  entities: [User, Project],
  migrations: ["src/infrastructure/database/migrations/*.ts"],
  subscribers: [],
});
