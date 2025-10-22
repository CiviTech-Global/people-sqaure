import { Request, Response } from "express";
import { User } from "../../domain/user/user.entity";
import { UserUtil } from "../../infrastructure/user.util";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { JwtUtil } from "../../infrastructure/auth/jwt.util";
import { AuthRequest } from "../../infrastructure/middleware/auth.middleware";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullName, email, role, password } = req.body;

      const sanitizedData = UserUtil.sanitizeUserData({ fullName, email, role, password });
      const validation = UserUtil.validateUserData(sanitizedData);

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        });
        return;
      }

      const existingUser = await this.userRepository.findByEmail(sanitizedData.email!);

      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "User with this email already exists",
        });
        return;
      }

      const newUser = await this.userRepository.create({
        fullName: sanitizedData.fullName!,
        email: sanitizedData.email!,
        role: sanitizedData.role!,
        password: sanitizedData.password!,
      });

      const token = JwtUtil.generateToken({
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: newUser.toJSON(),
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
        return;
      }

      const user = await this.userRepository.findByEmail(email.trim().toLowerCase());

      if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
        return;
      }

      const token = JwtUtil.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: user.toJSON(),
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;

      if (!email || !UserUtil.validateEmail(email)) {
        res.status(400).json({
          success: false,
          message: "Valid email is required",
        });
        return;
      }

      const user = await this.userRepository.findByEmail(email.trim().toLowerCase());

      if (!user) {
        res.status(200).json({
          success: true,
          message: "If the email exists, a verification code has been sent",
        });
        return;
      }

      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      res.status(200).json({
        success: true,
        message: "Verification code sent successfully",
        data: { verificationCode },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, newPassword } = req.body;

      if (!email || !newPassword) {
        res.status(400).json({
          success: false,
          message: "Email and new password are required",
        });
        return;
      }

      const passwordValidation = UserUtil.validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        res.status(400).json({
          success: false,
          message: passwordValidation.message,
        });
        return;
      }

      const user = await this.userRepository.findByEmail(email.trim().toLowerCase());

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      await this.userRepository.updatePassword(user.id, newPassword);

      res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const user = await this.userRepository.findById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { fullName, email, role } = req.body;

      const user = await this.userRepository.findById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      const sanitizedData = UserUtil.sanitizeUserData({ fullName, email, role });
      const validation = UserUtil.validateUserData(sanitizedData);

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        });
        return;
      }

      const updatedUser = await this.userRepository.update(id, sanitizedData);

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser?.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userRepository.findAll();
      const usersData = users.map((user) => user.toJSON());

      res.status(200).json({
        success: true,
        data: usersData,
        count: usersData.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
