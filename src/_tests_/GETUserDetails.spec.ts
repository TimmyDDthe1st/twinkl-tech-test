import makeSignupRequest from "./utils/makeSignupRequest";
import request from "supertest";
import app from "../index";
import {
  validUser,
  setupTestDatabase,
  expectSuccessfulUserRetrieval,
  expectErrorResponse,
} from "./utils/testHelpers";

describe("GET /api/users/:id", () => {
  beforeEach(() => {
    setupTestDatabase();
  });

  it("should retrieve user details by ID", async () => {
    const signupResponse = await makeSignupRequest(validUser);
    const userId = signupResponse.body.user.id;

    const response = await request(app).get(`/api/users/${userId}`);

    expectSuccessfulUserRetrieval(response, {
      id: userId,
      email: validUser.email,
      fullName: validUser.fullName,
      userType: validUser.userType,
    });
  });

  it("should return 404 for non-existent user", async () => {
    const response = await request(app).get("/api/users/999");

    expectErrorResponse(response, 404, "User not found");
  });
});
