import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { ProjectFile } from "../projectFile/projectFile.entity";

export type InvestmentStatus =
  | "self-sponsored"
  | "looking-for-first-sponsor"
  | "looking-for-more-sponsors";

export interface ProjectLinks {
  github?: string;
  linkedin?: string;
  website?: string;
  demo?: string;
  other?: string[];
}

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 500 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text", nullable: true })
  readme?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  demoLink?: string;

  @Column({ type: "jsonb", nullable: true })
  links?: ProjectLinks;

  @Column({
    type: "enum",
    enum: ["self-sponsored", "looking-for-first-sponsor", "looking-for-more-sponsors"],
    default: "self-sponsored",
  })
  investmentStatus!: InvestmentStatus;

  @Column({ type: "boolean", default: false })
  isRegistered!: boolean;

  @Column({ type: "uuid" })
  ownerId!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "ownerId" })
  owner!: User;

  @OneToMany(() => ProjectFile, (file) => file.project)
  files!: ProjectFile[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;

  toJSON() {
    const { deletedAt, owner, ...project } = this;
    return project;
  }
}
