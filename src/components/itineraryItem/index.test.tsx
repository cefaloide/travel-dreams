import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ItineraryItem from "./index";
import { Trip } from "@/types";

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

describe("ItineraryItem Component", () => {
  it("renders ItineraryItem components correctly", () => {
    const mockOnChangeDay = jest.fn();
    const mockOnChangeLocation = jest.fn();
    const mockOnChangeDescription = jest.fn();

    render(
      <ItineraryItem
        item={mockTrip.itinerary[0]}
        index={0}
        onChangeDay={mockOnChangeDay}
        onChangeLocation={mockOnChangeLocation}
        onChangeDescription={mockOnChangeDescription}
      />
    );

    expect(screen.getByPlaceholderText("Day")).toHaveValue(
      mockTrip.itinerary[0].day
    );
    expect(screen.getByPlaceholderText("Location")).toHaveValue(
      mockTrip.itinerary[0].location
    );
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      mockTrip.itinerary[0].description
    );
  });

  it("calls onChangeDay when day input is changed", () => {
    const mockOnChangeDay = jest.fn();
    const mockOnChangeLocation = jest.fn();
    const mockOnChangeDescription = jest.fn();

    render(
      <ItineraryItem
        item={mockTrip.itinerary[0]}
        index={0}
        onChangeDay={mockOnChangeDay}
        onChangeLocation={mockOnChangeLocation}
        onChangeDescription={mockOnChangeDescription}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Day"), {
      target: { value: "2" },
    });
    expect(mockOnChangeDay).toHaveBeenCalledWith(2, 0);
  });

  it("calls onChangeLocation when location input is changed", () => {
    const mockOnChangeDay = jest.fn();
    const mockOnChangeLocation = jest.fn();
    const mockOnChangeDescription = jest.fn();

    render(
      <ItineraryItem
        item={mockTrip.itinerary[0]}
        index={0}
        onChangeDay={mockOnChangeDay}
        onChangeLocation={mockOnChangeLocation}
        onChangeDescription={mockOnChangeDescription}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Location"), {
      target: { value: "Notre Dame" },
    });
    expect(mockOnChangeLocation).toHaveBeenCalledWith("Notre Dame", 0);
  });

  it("calls onChangeDescription when description input is changed", () => {
    const mockOnChangeDay = jest.fn();
    const mockOnChangeLocation = jest.fn();
    const mockOnChangeDescription = jest.fn();

    render(
      <ItineraryItem
        item={mockTrip.itinerary[0]}
        index={0}
        onChangeDay={mockOnChangeDay}
        onChangeLocation={mockOnChangeLocation}
        onChangeDescription={mockOnChangeDescription}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Visit the cathedral." },
    });
    expect(mockOnChangeDescription).toHaveBeenCalledWith(
      "Visit the cathedral.",
      0
    );
  });
});
