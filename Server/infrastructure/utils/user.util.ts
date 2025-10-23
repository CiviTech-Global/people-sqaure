import { User, UserRole } from "../../domain/user/user.entity";

export class UserUtil {
  public static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public static validatePassword(password: string): {
    isValid: boolean;
    message?: string;
  } {
    if (password.length < 8) {
      return {
        isValid: false,
        message: "Password must be at least 8 characters long",
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one uppercase letter",
      };
    }
    if (!/[a-z]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one lowercase letter",
      };
    }
    if (!/[0-9]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one number",
      };
    }
    return { isValid: true };
  }

  public static validateRole(role: string): role is UserRole {
    const validRoles: UserRole[] = [
      "startup-owner",
      "investor",
      "organization",
      "citizen",
    ];
    return validRoles.includes(role as UserRole);
  }

  public static validateUserData(data: Partial<User>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!data.fullName || data.fullName.trim().length === 0) {
      errors.push("Full name is required");
    }

    if (!data.email || !this.validateEmail(data.email)) {
      errors.push("Valid email is required");
    }

    if (!data.role || !this.validateRole(data.role)) {
      errors.push("Valid role is required");
    }

    if (data.password) {
      const passwordValidation = this.validatePassword(data.password);
      if (!passwordValidation.isValid && passwordValidation.message) {
        errors.push(passwordValidation.message);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public static sanitizeUserData(data: any): Partial<User> {
    return {
      fullName: data.fullName?.trim(),
      email: data.email?.trim().toLowerCase(),
      role: data.role,
      password: data.password,
    };
  }
}
