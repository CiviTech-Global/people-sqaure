import { Request, Response, NextFunction } from "express";
import { JwtUtil, JwtPayload } from "../auth/jwt.util";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export class AuthMiddleware {
  public static authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
          success: false,
          message: "No token provided",
        });
        return;
      }

      const token = authHeader.substring(7);
      const decoded = JwtUtil.verifyToken(token);

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  }

  public static authorizeRoles(...allowedRoles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      if (!allowedRoles.includes(req.user.role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden: Insufficient permissions",
        });
        return;
      }

      next();
    };
  }
}
