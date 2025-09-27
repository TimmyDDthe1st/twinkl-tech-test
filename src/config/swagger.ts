import swaggerJsdoc from "swagger-jsdoc";
import { UserType } from "../types/user";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Twinkl User API",
      version: "1.0.0",
      description:
        "A simple Express TypeScript API for user signup and retrieval",
      contact: {
        name: "API Support",
        email: "support@twinkl.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        UserType: {
          type: "string",
          enum: ["student", "teacher", "parent", "private tutor"],
          description: "Type of user in the system",
        },
        CreateUserRequest: {
          type: "object",
          required: ["fullName", "email", "password", "userType"],
          properties: {
            fullName: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              description: "Full name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email address of the user",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              minLength: 8,
              maxLength: 64,
              pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)",
              description:
                "Password must be 8-64 characters with at least one lowercase, uppercase, and digit",
              example: "SecurePass123!",
            },
            userType: {
              $ref: "#/components/schemas/UserType",
            },
            createdDate: {
              type: "string",
              format: "date-time",
              description:
                "Optional creation date (auto-generated if not provided)",
              example: "2025-09-27T10:30:00.000Z",
            },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique user identifier",
              example: "1",
            },
            fullName: {
              type: "string",
              description: "Full name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email address of the user",
              example: "john.doe@example.com",
            },
            userType: {
              $ref: "#/components/schemas/UserType",
            },
            createdDate: {
              type: "string",
              format: "date-time",
              description: "When the user was created",
              example: "2025-09-27T10:30:00.000Z",
            },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Validation failed",
            },
            details: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    example: "email",
                  },
                  message: {
                    type: "string",
                    example: "Invalid email format",
                  },
                },
              },
            },
            fields: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["email", "password"],
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "User created successfully",
            },
            user: {
              $ref: "#/components/schemas/UserResponse",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "User not found",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
