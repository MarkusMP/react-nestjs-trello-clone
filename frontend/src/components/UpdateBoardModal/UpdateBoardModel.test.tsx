import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import UpdateBoardModal from "./UpdateBoardModal";
describe("UpdateBoardModal", () => {
  test("renders correctly", () => {
    render(
      <UpdateBoardModal open={true} closeModal={() => {}} boardId="testid" />
    );

    expect(
      screen.getByRole("heading", { name: /board settings/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /update board title/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /enter background image url/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update board/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /upload board background image/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/upload an image/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /upload board image/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /set background color/i })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/set a background color/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /set background color/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /delete board/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete board/i })
    ).toBeInTheDocument();
  });
  test("input should be typable", () => {
    render(
      <UpdateBoardModal open={true} closeModal={() => {}} boardId="testid" />
    );

    const titleInput = screen.getByRole("textbox", {
      name: /update board title/i,
    }) as HTMLInputElement;
    const linkInput = screen.getByRole("textbox", {
      name: /enter background image url/i,
    }) as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "test" } });
    fireEvent.change(linkInput, { target: { value: "test" } });

    expect(titleInput.value).toBe("test");
    expect(linkInput.value).toBe("test");
  });
});
