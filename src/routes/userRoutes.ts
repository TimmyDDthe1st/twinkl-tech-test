import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *           examples:
 *             student:
 *               summary: Student signup
 *               value:
 *                 fullName: "Jane Smith"
 *                 email: "jane.smith@student.com"
 *                 password: "StudentPass123!"
 *                 userType: "student"
 *             teacher:
 *               summary: Teacher signup
 *               value:
 *                 fullName: "Dr. John Wilson"
 *                 email: "john.wilson@school.edu"
 *                 password: "TeacherPass456!"
 *                 userType: "teacher"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               message: "User created successfully"
 *               user:
 *                 id: "1"
 *                 fullName: "Jane Smith"
 *                 email: "jane.smith@student.com"
 *                 userType: "student"
 *                 createdDate: "2025-09-27T10:30:00.000Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             example:
 *               error: "Validation failed"
 *               details:
 *                 - field: "email"
 *                   message: "Invalid email format"
 *                 - field: "password"
 *                   message: "Password must be at least 8 characters long"
 *               fields: ["email", "password"]
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "User with this email already exists"
 */
userRoutes.post("/signup", UserController.signup);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *         example: "1"
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               message: "User retrieved successfully"
 *               user:
 *                 id: "1"
 *                 fullName: "Jane Smith"
 *                 email: "jane.smith@student.com"
 *                 userType: "student"
 *                 createdDate: "2025-09-27T10:30:00.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "User not found"
 */
userRoutes.get("/users/:id", UserController.getUserById);

export default userRoutes;
