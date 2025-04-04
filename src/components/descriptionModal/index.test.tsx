import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Trip } from "@/types";
import DescriptionModal from "../descriptionModal";

const mockTrip: Trip = {
  id: 1,
  title: "Trip to Paris",
  description: "A wonderful trip to Paris.",
  photo_url: "https://example.com/paris.jpg",
  introduction: "Welcome to Paris!",
  status: "todo",
  itinerary: [
    {
      day: 1,
      location: "Eiffel Tower",
      description: "A must-see landmark in Paris.",
    },
    {
      day: 2,
      location: "Louvre Museum",
      description: "Home to the Mona Lisa.",
    },
  ],
};

const mockOnChangeStatus = jest.fn();
const mockOnClose = jest.fn();

const renderComponent = () => {
  const container = document.createElement("div");
  container.id = "modal-root";
  document.body.appendChild(container);

  render(
    <DescriptionModal
      trip={mockTrip}
      onChangeStatus={mockOnChangeStatus}
      onClose={mockOnClose}
    />
  );
};

describe("DescriptionModal Component", () => {
  it("renders correctly when trip is provided", () => {
    renderComponent();

    expect(screen.getByText(mockTrip.title)).toBeInTheDocument();
    expect(screen.getByText(mockTrip.description)).toBeInTheDocument();
    expect(screen.getByText("Itinerary")).toBeInTheDocument();

    expect(
      screen.getByText(
        `Day ${mockTrip.itinerary[0].day}: ${mockTrip.itinerary[0].location}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        `Day ${mockTrip.itinerary[1].day}: ${mockTrip.itinerary[1].location}`
      )
    ).toBeInTheDocument();
  });

  it("renders correctly when trip is null", () => {
    render(
      <DescriptionModal
        trip={null}
        onChangeStatus={mockOnChangeStatus}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText(mockTrip.title)).not.toBeInTheDocument();
  });

  it("calls onChangeStatus with correct arguments when status is toggled", () => {
    renderComponent();

    fireEvent.click(screen.getByText("☑️ Mark as completed"));
    expect(mockOnChangeStatus).toHaveBeenCalledWith(1, "done");
  });

  it("calls onClose when the modal is closed", () => {
    renderComponent();

    fireEvent.click(screen.getByText("x"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
