import { apiClient } from "./axios.config";

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  role?: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

export class UserService {
  public static async updateProfile(userId: string, data: UpdateUserData): Promise<UserResponse> {
    const response = await apiClient.put<UserResponse>(`/api/users/${userId}`, data);
    return response.data;
  }

  public static async getProfile(userId: string): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>(`/api/users/${userId}`);
    return response.data;
  }
}
