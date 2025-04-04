import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Trip } from "@/types";
import Filter from "../filter";

describe("Filter Component", () => {
  const mockSetSelectedFilter = jest.fn();

  const renderFilter = (selectedFilter: string) => {
    render(
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={mockSetSelectedFilter}
      />
    );
  };

  it("renders correctly with 'all' selected", () => {
    renderFilter("all");

    expect(screen.getByText("All")).toHaveClass("selectedFilter");
    expect(screen.getByText("Upcoming")).toHaveClass("notSelectedFilter");
    expect(screen.getByText("Completed")).toHaveClass("notSelectedFilter");
  });

  it("renders correctly with 'todo' selected", () => {
    renderFilter("todo");

    expect(screen.getByText("All")).toHaveClass("notSelectedFilter");
    expect(screen.getByText("Upcoming")).toHaveClass("selectedFilter");
    expect(screen.getByText("Completed")).toHaveClass("notSelectedFilter");
  });

  it("renders correctly with 'done' selected", () => {
    renderFilter("done");

    expect(screen.getByText("All")).toHaveClass("notSelectedFilter");
    expect(screen.getByText("Upcoming")).toHaveClass("notSelectedFilter");
    expect(screen.getByText("Completed")).toHaveClass("selectedFilter");
  });

  it("calls setSelectedFilter with 'all' when 'All' is clicked", () => {
    renderFilter("todo");

    fireEvent.click(screen.getByText("All"));
    expect(mockSetSelectedFilter).toHaveBeenCalledWith("all");
  });

  it("calls setSelectedFilter with 'todo' when 'Upcoming' is clicked", () => {
    renderFilter("all");

    fireEvent.click(screen.getByText("Upcoming"));
    expect(mockSetSelectedFilter).toHaveBeenCalledWith("todo");
  });

  it("calls setSelectedFilter with 'done' when 'Completed' is clicked", () => {
    renderFilter("all");

    fireEvent.click(screen.getByText("Completed"));
    expect(mockSetSelectedFilter).toHaveBeenCalledWith("done");
  });
});
