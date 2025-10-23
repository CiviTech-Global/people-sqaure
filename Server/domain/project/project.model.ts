export type InvestmentStatus =
  | "self-sponsored"
  | "looking-for-first-sponsor"
  | "looking-for-more-sponsors";

export interface IProjectLinks {
  github?: string;
  linkedin?: string;
  website?: string;
  demo?: string;
  other?: string[];
}

export interface IProject {
  id?: string;
  title: string;
  description: string;
  readme?: string;
  proposalFile?: string;
  whitePaper?: string;
  demoLink?: string;
  links?: IProjectLinks;
  investmentStatus: InvestmentStatus;
  isRegistered: boolean;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Project implements IProject {
  id?: string;
  title: string;
  description: string;
  readme?: string;
  proposalFile?: string;
  whitePaper?: string;
  demoLink?: string;
  links?: IProjectLinks;
  investmentStatus: InvestmentStatus;
  isRegistered: boolean;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  constructor(data: IProject) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.readme = data.readme;
    this.proposalFile = data.proposalFile;
    this.whitePaper = data.whitePaper;
    this.demoLink = data.demoLink;
    this.links = data.links;
    this.investmentStatus = data.investmentStatus;
    this.isRegistered = data.isRegistered;
    this.ownerId = data.ownerId;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.deletedAt = data.deletedAt || null;
  }

  public updateProject(data: Partial<IProject>): void {
    if (data.title) this.title = data.title;
    if (data.description) this.description = data.description;
    if (data.readme !== undefined) this.readme = data.readme;
    if (data.proposalFile !== undefined) this.proposalFile = data.proposalFile;
    if (data.whitePaper !== undefined) this.whitePaper = data.whitePaper;
    if (data.demoLink !== undefined) this.demoLink = data.demoLink;
    if (data.links !== undefined) this.links = data.links;
    if (data.investmentStatus) this.investmentStatus = data.investmentStatus;
    if (data.isRegistered !== undefined) this.isRegistered = data.isRegistered;
    this.updatedAt = new Date();
  }

  public softDelete(): void {
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }

  public restore(): void {
    this.deletedAt = null;
    this.updatedAt = new Date();
  }

  public toJSON(): Omit<IProject, "deletedAt"> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      readme: this.readme,
      proposalFile: this.proposalFile,
      whitePaper: this.whitePaper,
      demoLink: this.demoLink,
      links: this.links,
      investmentStatus: this.investmentStatus,
      isRegistered: this.isRegistered,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
