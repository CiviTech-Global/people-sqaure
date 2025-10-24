import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Project } from "../project/project.entity";

export type FileType = "proposal" | "whitepaper" | "other";

@Entity("project_files")
export class ProjectFile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  projectId!: string;

  @ManyToOne(() => Project, { onDelete: "CASCADE" })
  @JoinColumn({ name: "projectId" })
  project!: Project;

  @Column({ type: "varchar", length: 255 })
  originalName!: string;

  @Column({ type: "varchar", length: 255 })
  fileName!: string;

  @Column({ type: "varchar", length: 500 })
  filePath!: string;

  @Column({ type: "varchar", length: 100 })
  mimeType!: string;

  @Column({ type: "bigint" })
  fileSize!: number;

  @Column({ type: "varchar", length: 50 })
  fileType!: FileType;

  @Column({ type: "text", nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;

  public toJSON() {
    return {
      id: this.id,
      projectId: this.projectId,
      originalName: this.originalName,
      fileName: this.fileName,
      filePath: this.filePath,
      mimeType: this.mimeType,
      fileSize: this.fileSize,
      fileType: this.fileType,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
