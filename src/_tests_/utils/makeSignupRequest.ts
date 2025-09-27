import request from "supertest";
import app from "../../index";

const makeSignupRequest = (userData: object) => {
  return request(app)
    .post("/api/signup")
    .send(userData)
    .expect("Content-Type", /json/);
};

export default makeSignupRequest;
