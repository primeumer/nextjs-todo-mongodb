import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import { getUserId } from "./auth";

describe("getUserId", () => {
  it("returns null when there is no cookie", () => {
    const request = new Request("http://localhost/api/tasks");
    expect(getUserId(request)).toBe(null);
  });
  it("returns null when the token is invalid", () => {
    const request = new Request("http://localhost/api/tasks", {
      headers: {
        cookie: "token=invalid-token-here",
      },
    });
    expect(getUserId(request)).toBe(null);
  });
  it("returns the userId when the token is valid", () => {
    const fakeUserId = "12345";
    const token = jwt.sign({ userId: fakeUserId }, "test-secret");
    const request = new Request("http://localhost/api/tasks", {
      headers: {
        cookie: `token=${token}`,
      },
    });
    process.env.JWT_SECRET = "test-secret";
    expect(getUserId(request)).toBe(fakeUserId);
  });
});