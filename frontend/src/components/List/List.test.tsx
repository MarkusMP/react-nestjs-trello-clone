import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import List from "./List";

describe("List", () => {
  test("Should render correctly", () => {
    render(<List boardId="boardId" cards={[]} id="id" title="title list" />);

    expect(
      screen.getByRole("heading", { name: /title list/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /x/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /add a card/i })
    ).toBeInTheDocument();
  });

  test("Should render a textbox with a button when (add a card) is clicked", () => {
    render(<List boardId="boardId" cards={[]} id="id" title="title list" />);
    fireEvent.click(screen.getByRole("heading", { name: /add a card/i }));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add card/i })
    ).toBeInTheDocument();
  });
});
