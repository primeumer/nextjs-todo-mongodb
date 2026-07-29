import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
describe("LoginPage", () => {
  it("renders email and password inputs", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("updates the email input when typing", async () => {
    render(<LoginPage />);
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    await user.type(emailInput, "test@example.com");
    expect(emailInput.value).toBe("test@example.com");
  });
});