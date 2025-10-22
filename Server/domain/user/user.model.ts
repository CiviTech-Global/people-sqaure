export type UserRole = "startup-owner" | "investor" | "organization" | "citizen";

export interface IUser {
  id?: string;
  fullName: string;
  email: string;
  role: UserRole;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  id?: string;
  fullName: string;
  email: string;
  role: UserRole;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: IUser) {
    this.id = data.id;
    this.fullName = data.fullName;
    this.email = data.email;
    this.role = data.role;
    this.password = data.password;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  public updatePassword(newPassword: string): void {
    this.password = newPassword;
    this.updatedAt = new Date();
  }

  public updateProfile(data: Partial<IUser>): void {
    if (data.fullName) this.fullName = data.fullName;
    if (data.email) this.email = data.email;
    if (data.role) this.role = data.role;
    this.updatedAt = new Date();
  }

  public toJSON(): Omit<IUser, "password"> {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
