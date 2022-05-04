import { render, screen } from "../../tests/utils/test-utils";
import Card from "./Card";

describe("Card", () => {
  test("should render correctly when everything is passed", () => {
    render(
      <Card
        description="description card"
        id="id"
        listId="listId"
        title="title card"
      />
    );

    expect(screen.getByText(/title card/i)).toBeInTheDocument();
  });
});
