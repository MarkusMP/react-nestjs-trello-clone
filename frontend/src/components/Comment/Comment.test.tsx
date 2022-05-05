import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import Comment from "./Comment";

describe("Comment", () => {
  test("Should render correctly", () => {
    render(<Comment commentId="commmentId" title="title comment" />);

    expect(screen.getByText(/title comment/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  test("when edit is clicked should replace with save", () => {
    render(<Comment commentId="commmentId" title="title comment" />);
    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);
    expect(
      screen.getByRole("button", {
        name: /save/i,
      })
    ).toBeInTheDocument();
  });
});
