import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FormModal from "../formModal";
import { mockTrips } from "@/__mocks__/mockTrips";
const mockTrip = mockTrips[0];

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();

const renderComponent = () => {
  const container = document.createElement("div");
  container.id = "modal-root";
  document.body.appendChild(container);

  render(
    <FormModal trip={mockTrip} onSave={mockOnSave} onClose={mockOnClose} />
  );
};

describe("FormModal Component", () => {
  it("renders correctly when trip is provided", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Italy")).toHaveValue(mockTrip.title);
    expect(screen.getByPlaceholderText("From Rome to Venice...")).toHaveValue(
      mockTrip.introduction
    );
    expect(
      screen.getByPlaceholderText("Discover the wonders of the Roman empire...")
    ).toHaveValue(mockTrip.description);
    expect(screen.getByPlaceholderText("Image URL")).toHaveValue(
      mockTrip.photo_url
    );
  });

  it("calls onSave with updated trip when Save is clicked", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Italy"), {
      target: { value: "Updated Trip to Paris" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockTrip,
      title: "Updated Trip to Paris",
    });
  });

  it("updates itinerary when itinerary fields are changed", () => {
    renderComponent();

    fireEvent.change(screen.getAllByPlaceholderText("Day")[0], {
      target: { value: "3" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Location")[0], {
      target: { value: "Notre Dame" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Description")[0], {
      target: { value: "Visit the cathedral." },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockTrip,
      itinerary: [
        {
          day: 3,
          location: "Notre Dame",
          description: "Visit the cathedral.",
        },
        mockTrip.itinerary[1],
      ],
    });
  });

  it("calls onClose when the modal is closed", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Save"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
