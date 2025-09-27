import { UserModel } from "../../models/User";
import { CreateUserRequest, UserType } from "../../types/user";
import { Response } from "supertest";

export const validUser: CreateUserRequest = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  password: "SecurePass123!",
  createdDate: new Date().toISOString(),
  userType: "student",
};

export const setupTestDatabase = (): void => {
  UserModel.clear();
};
export const expectSuccessfulUserCreation = (
  response: Response,
  userData: CreateUserRequest
): void => {
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("message", "User created successfully");
  expect(response.body).toHaveProperty("user");
  expect(response.body.user.email).toBe(userData.email);
  expect(response.body.user.fullName).toBe(userData.fullName);
  expect(response.body.user.userType).toBe(userData.userType);
  expect(response.body.user).not.toHaveProperty("password");
};

export const expectErrorResponse = (
  response: Response,
  expectedStatus: number,
  expectedError: string
): void => {
  expect(response.status).toBe(expectedStatus);
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBe(expectedError);
};

export const expectValidationError = (
  response: Response,
  expectedFields?: string[]
): void => {
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("error", "Validation failed");
  expect(response.body).toHaveProperty("details");
  expect(Array.isArray(response.body.details)).toBe(true);

  if (expectedFields) {
    expect(response.body).toHaveProperty("fields");
    expect(response.body.fields).toEqual(
      expect.arrayContaining(expectedFields)
    );
  }
};

export const expectSuccessfulUserRetrieval = (
  response: Response,
  expectedUser: {
    id: string;
    email: string;
    fullName: string;
    userType: UserType;
  }
): void => {
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty(
    "message",
    "User retrieved successfully"
  );
  expect(response.body).toHaveProperty("user");
  expect(response.body.user.id).toBe(expectedUser.id);
  expect(response.body.user.email).toBe(expectedUser.email);
  expect(response.body.user.fullName).toBe(expectedUser.fullName);
  expect(response.body.user.userType).toBe(expectedUser.userType);
  expect(response.body.user).not.toHaveProperty("password");
};

// Common test data sets
export const validUserTypes: Array<[UserType]> = [
  ["student"],
  ["teacher"],
  ["parent"],
  ["private tutor"],
];
