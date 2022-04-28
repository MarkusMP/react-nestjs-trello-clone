import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import CreateBoardModal from "./CreateBoardModal";

describe("CreateBoardModal", () => {
  test("renders correctly", () => {
    const fn = jest.fn();
    render(<CreateBoardModal closeModal={fn} open={true} />);
    expect(
      screen.getByRole("heading", { name: /create board/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /title/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create new board/i })
    ).toBeInTheDocument();
  });
  test('calls "closeModal" prop when "X" button is clicked', () => {
    const fn = jest.fn();
    render(<CreateBoardModal closeModal={fn} open={true} />);
    const closeButton = screen.getByRole("button", { name: /x/i });
    fireEvent.click(closeButton);
    expect(fn).toHaveBeenCalled();
  });
  test("input should be typable", () => {
    const fn = jest.fn();
    render(<CreateBoardModal closeModal={fn} open={true} />);
    const input = screen.getByRole("textbox", {
      name: /title/i,
    }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });
});
