import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BaseModal from "./index";

const mockOnClose = jest.fn();
const mockHeaderImg = "https://example.com/header.jpg";

const renderComponent = (headerImg?: string) => {
  const container = document.createElement("div");
  container.id = "modal-root";
  document.body.appendChild(container);

  render(
    <BaseModal onClose={mockOnClose} headerImg={headerImg}>
      <div>Modal Content</div>
    </BaseModal>
  );
};

describe("BaseModal Component", () => {
  it("renders BaseModal correctly with children and headerImg", () => {
    renderComponent(mockHeaderImg);

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveStyle(
      `background-image: url(${mockHeaderImg})`
    );
  });

  it("calls onClose when close button is clicked", () => {
    renderComponent(mockHeaderImg);

    fireEvent.click(screen.getByText("x"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders BaseModal without headerImg when not provided", () => {
    renderComponent();

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
