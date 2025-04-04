import { render, screen, fireEvent } from "@testing-library/react";
import TripCard from "./index";

const mockTrip = {
  id: 1,
  title: "Trip to Paris",
  description: "A wonderful trip to Paris.",
  photo_url: "https://example.com/paris.jpg",
};

const mockOnDelete = jest.fn();
const mockShowDescriptionModal = jest.fn();
const mockShowFormModal = jest.fn();

describe("TripCard Component", () => {
  it("renders the trip details correctly", () => {
    render(
      <TripCard
        trip={mockTrip}
        onDelete={mockOnDelete}
        showDescriptionModal={mockShowDescriptionModal}
        showFormModal={mockShowFormModal}
      />
    );

    expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
    expect(screen.getByText("A wonderful trip to Paris.")).toBeInTheDocument();
    expect(screen.getByText("See trip details")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  //   it("calls showDescriptionModal when 'See trip details' is clicked", () => {
  //     render(
  //       <TripCard
  //         trip={mockTrip}
  //         onDelete={mockOnDelete}
  //         showDescriptionModal={mockShowDescriptionModal}
  //         showFormModal={mockShowFormModal}
  //       />
  //     );

  //     fireEvent.click(screen.getByText("See trip details"));
  //     expect(mockShowDescriptionModal).toHaveBeenCalledWith(mockTrip);
  //   });

  //   it("calls showFormModal when 'Edit' is clicked", () => {
  //     render(
  //       <TripCard
  //         trip={mockTrip}
  //         onDelete={mockOnDelete}
  //         showDescriptionModal={mockShowDescriptionModal}
  //         showFormModal={mockShowFormModal}
  //       />
  //     );

  //     fireEvent.click(screen.getByText("Edit"));
  //     expect(mockShowFormModal).toHaveBeenCalledWith(mockTrip);
  //   });

  //   it("calls onDelete when 'Delete' is clicked", () => {
  //     render(
  //       <TripCard
  //         trip={mockTrip}
  //         onDelete={mockOnDelete}
  //         showDescriptionModal={mockShowDescriptionModal}
  //         showFormModal={mockShowFormModal}
  //       />
  //     );

  //     fireEvent.click(screen.getByText("Delete"));
  //     expect(mockOnDelete).toHaveBeenCalledWith(mockTrip.id);
  //   });

  //   it("renders the background image correctly", () => {
  //     render(
  //       <TripCard
  //         trip={mockTrip}
  //         onDelete={mockOnDelete}
  //         showDescriptionModal={mockShowDescriptionModal}
  //         showFormModal={mockShowFormModal}
  //       />
  //     );

  //     const leftDiv = screen.getByRole("img", { hidden: true });
  //     expect(leftDiv).toHaveStyle(`background-image: url(${mockTrip.photo_url})`);
  //   });
});
