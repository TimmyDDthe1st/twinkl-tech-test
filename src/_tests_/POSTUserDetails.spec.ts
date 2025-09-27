import { CreateUserRequest, UserType } from "../types";
import { ValidationErrorDetail } from "../types/validation";
import { ValidationFailureCase } from "../types/test";
import makeSignupRequest from "./utils/makeSignupRequest";
import {
  validUser,
  setupTestDatabase,
  expectSuccessfulUserCreation,
  expectErrorResponse,
  expectValidationError,
  validUserTypes,
} from "./utils/testHelpers";

describe("POST /api/signup", () => {
  beforeEach(() => {
    setupTestDatabase();
  });

  describe("Successful signup", () => {
    it("should create a new user with valid data", async () => {
      const response = await makeSignupRequest(validUser);
      expectSuccessfulUserCreation(response, validUser);
    });

    it.each(validUserTypes)(
      "should create user with userType: %s",
      async (userType: UserType) => {
        const testUser: CreateUserRequest = {
          ...validUser,
          email: `test.${userType.replace(/\s+/g, "")}@example.com`,
          userType,
        };
        const response = await makeSignupRequest(testUser);
        expectSuccessfulUserCreation(response, testUser);
      }
    );

    it("should sanitize and normalize valid data", async () => {
      const userData = {
        fullName: "  John Doe  ",
        email: "JOHN@EXAMPLE.COM",
        password: "SecurePassword123",
        userType: "student" as UserType,
      };

      const response = await makeSignupRequest(userData);
      expect(response.status).toBe(201);
      expect(response.body.user.fullName).toBe("John Doe");
      expect(response.body.user.email).toBe("john@example.com");
    });
  });

  describe("Failed signup", () => {
    const validationFailures: ValidationFailureCase[] = [
      {
        description: "empty body",
        userData: {},
        expectedFields: ["fullName", "email", "password", "userType"],
      },
      {
        description: "missing required fields",
        userData: { fullName: "John Doe", email: "john@example.com" },
        expectedFields: ["password", "userType"],
      },
      {
        description: "empty string values",
        userData: {
          fullName: "",
          email: "",
          password: "",
          userType: "",
        },
        expectedFields: ["fullName", "email", "password", "userType"],
      },
      {
        description: "password too short",
        userData: { ...validUser, password: "Short1" },
        expectedFields: ["password"],
      },
      {
        description: "password missing lowercase",
        userData: { ...validUser, password: "PASSWORD123" },
        expectedFields: ["password"],
      },
      {
        description: "password missing uppercase",
        userData: { ...validUser, password: "password123" },
        expectedFields: ["password"],
      },
      {
        description: "password missing digit",
        userData: { ...validUser, password: "Password" },
        expectedFields: ["password"],
      },
      {
        description: "invalid userType",
        userData: { ...validUser, userType: "invalid-type" },
        expectedFields: ["userType"],
      },
    ];

    it.each(validationFailures)(
      "should return 400 with validation errors when $description",
      async ({ userData, expectedFields }: ValidationFailureCase) => {
        const response = await makeSignupRequest(userData);
        expectValidationError(response, expectedFields);
      }
    );

    const invalidEmailFormats = [
      "plaintext",
      "@domain.com",
      "user@",
      "user..name@domain.com",
      "user name@domain.com",
      "invalid-email-format",
    ];

    it.each(invalidEmailFormats)(
      "should reject invalid email format: %s",
      async (email: string) => {
        const userData = { ...validUser, email };
        const response = await makeSignupRequest(userData);
        expectValidationError(response, ["email"]);
      }
    );

    it("should provide detailed validation messages for multiple errors", async () => {
      const invalidData = {
        fullName: "A",
        email: "bad-email",
        password: "12",
        userType: "wrong",
      };

      const response = await makeSignupRequest(invalidData);
      expectValidationError(response);

      expect(response.body.details).toHaveLength(5);
      expect(
        response.body.details.some((d: ValidationErrorDetail) =>
          d.message.includes("at least 2 characters")
        )
      ).toBe(true);
      expect(
        response.body.details.some((d: ValidationErrorDetail) =>
          d.message.includes("Invalid email format")
        )
      ).toBe(true);
      expect(
        response.body.details.some((d: ValidationErrorDetail) =>
          d.message.includes("at least 8 characters")
        )
      ).toBe(true);
    });

    it("should return 409 when user with email already exists", async () => {
      await makeSignupRequest(validUser);

      const duplicateUser = { ...validUser, fullName: "Jane Doe" };
      const response = await makeSignupRequest(duplicateUser);
      expectErrorResponse(response, 409, "User with this email already exists");
    });
  });
});
