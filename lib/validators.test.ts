import { describe, it, expect } from "vitest";
import { isValidEmail, isValidPassword } from "./validator";

describe("isValidEmail", () => {
  it("returns true for a valid email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
  });
  it("returns false for an email without @", () => {
    expect(isValidEmail("testexample.com")).toBe(false);
  });
  it("returns false for an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });
});
describe ("isValidPassword", () => {
  it("returns true for a password with 8 or more characters", () => {
    expect(isValidPassword("12345678")).toBe(true);
  });
  it("returns false for a password wirh fewer then 8 characters", () => {
    expect(isValidPassword ("1234")).toBe(false);
  });
  it("returns false for an empty password", () => {
    expect(isValidPassword("")).toBe(false);
  });
});