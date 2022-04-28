import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import Modal from "./Modal";

describe("Modal", () => {
  test("Should render modal correctly", () => {
    const close = jest.fn();
    const handleDelete = jest.fn();
    render(
      <Modal
        closeModal={close}
        handleDelete={handleDelete}
        open={true}
        description="description test"
        title="title test"
      />
    );

    expect(
      screen.getByRole("heading", { name: /title test/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/description test/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });
  test("Should call closeModal prop when close button is clicked", () => {
    const close = jest.fn();
    const handleDelete = jest.fn();
    render(
      <Modal
        closeModal={close}
        handleDelete={handleDelete}
        open={true}
        description="description test"
        title="title test"
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(close).toHaveBeenCalled();
  });
  test("Should call handleDelete prop when delete button is clicked", () => {
    const close = jest.fn();
    const handleDelete = jest.fn();
    render(
      <Modal
        closeModal={close}
        handleDelete={handleDelete}
        open={true}
        description="description test"
        title="title test"
      />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });
});
