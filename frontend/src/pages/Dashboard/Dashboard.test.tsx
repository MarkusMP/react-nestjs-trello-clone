import { render, screen } from "../../tests/utils/test-utils";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  test("should render Dashboard component", () => {
    render(<Dashboard />);
    expect(
      screen.getByRole("heading", { name: /personal boards/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create new board\.\.\./i })
    ).toBeInTheDocument();
  });
});
