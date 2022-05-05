import { render, screen } from "../../tests/utils/test-utils";
import UpdateCardModal from "./UpdateCardModal";

describe("UpdateCardModal", () => {
  test("should render correctly when everything is passed not empty", () => {
    render(
      <UpdateCardModal
        open={true}
        closeModal={() => {}}
        cardId="testid"
        listId="list"
        cardDescription="description test"
        cardTitle="title"
      />
    );
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /description/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/description test/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete card/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /comments/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });
  test("Should render div with p when cardDescription is empty", () => {
    render(
      <UpdateCardModal
        open={true}
        closeModal={() => {}}
        cardId="testid"
        listId="list"
        cardDescription=""
        cardTitle="title"
      />
    );
    expect(
      screen.getByText(/add a more detailed description\.\.\./i)
    ).toBeInTheDocument();
  });
});
