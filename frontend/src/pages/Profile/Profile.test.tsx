import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import Profile from "./Profile";

describe("Profile", () => {
  test("should render Profile component", () => {
    render(<Profile />);
    expect(
      screen.getByRole("heading", { name: /update profile/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /change email/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/change password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update profile/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /delete profile/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete profile/i })
    ).toBeInTheDocument();
  });
  test("input is typeable", () => {
    render(<Profile />);
    const input = screen.getByLabelText(/change password/i) as HTMLInputElement;
    const input2 = screen.getByLabelText(/change email/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.change(input2, { target: { value: "test2" } });
    expect(input.value).toBe("test");
    expect(input2.value).toBe("test2");
  });
});
