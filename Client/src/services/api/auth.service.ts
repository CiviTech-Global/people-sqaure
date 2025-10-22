import { apiClient } from "./axios.config";

export interface RegisterData {
  fullName: string;
  email: string;
  role: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
}

export class AuthService {
  public static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/api/users/register", data);
    return response.data;
  }

  public static async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/api/users/login", data);
    return response.data;
  }

  public static async forgotPassword(data: ForgotPasswordData): Promise<any> {
    const response = await apiClient.post("/api/users/forgot-password", data);
    return response.data;
  }

  public static async resetPassword(data: ResetPasswordData): Promise<any> {
    const response = await apiClient.post("/api/users/reset-password", data);
    return response.data;
  }

  public static saveAuthData(token: string, user: any): void {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  public static getToken(): string | null {
    return localStorage.getItem("token");
  }

  public static getUser(): any {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  public static clearAuthData(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  public static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
