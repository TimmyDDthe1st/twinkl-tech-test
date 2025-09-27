import { Request, Response } from "express";
import { UserModel } from "../models/User";
import {
  signupSchema,
  formatValidationErrors,
} from "../validation/userValidation";

export class UserController {
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = signupSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const formattedErrors = formatValidationErrors(error);
        res.status(400).json(formattedErrors);
        return;
      }

      const { fullName, email, password, userType } = value;

      const existingUser = UserModel.findByEmail(email);
      if (existingUser) {
        res.status(409).json({
          error: "User with this email already exists",
        });
        return;
      }

      const newUser = UserModel.create({
        fullName,
        email,
        password,
        createdDate: new Date().toISOString(),
        userType,
      });

      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = UserModel.getAll();
      res.status(200).json({
        message: "Users retrieved successfully",
        users,
        count: users.length,
      });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = UserModel.findById(id);

      if (!user) {
        res.status(404).json({
          error: "User not found",
        });
        return;
      }

      const { password, ...userResponse } = user;

      res.status(200).json({
        message: "User retrieved successfully",
        user: userResponse,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}
