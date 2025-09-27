import request from "supertest";
import app from "../index"; // Adjust path to your Express app
import { UserModel } from "../models/User";

describe("POST /api/signup", () => {
  // Clear users before each test to ensure isolation
  beforeEach(() => {
    UserModel.clear();
  });

  const validUser = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    password: "SecurePass123",
    createdDate: new Date().toISOString(),
    userType: "student",
  };

  const invalidUser = {};

  describe("Successful signup", () => {
    it("should create a new user with valid data", async () => {
      const response = await request(app)
        .post("/api/signup")
        .send(validUser)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("user");
      expect(response.body.user.email).toBe(validUser.email);
      expect(response.body.user.fullName).toBe(validUser.fullName);
      expect(response.body.user.userType).toBe(validUser.userType);
      // Password should not be returned
      expect(response.body.user).not.toHaveProperty("password");
    });
  });

  describe("Failed signup", () => {
    it("should return 400 when no body is passed", async () => {
      const response = await request(app)
        .post("/api/signup")
        .send(invalidUser)
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });
});
