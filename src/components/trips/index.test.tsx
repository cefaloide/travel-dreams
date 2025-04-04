import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Trip } from "@/types";
import Trips from "./index";

const mockTrips: Trip[] = [
  {
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
    ],
  },
  {
    id: 2,
    title: "Trip to Rome",
    description: "Explore the ancient city of Rome.",
    photo_url: "https://example.com/rome.jpg",
    introduction: "Welcome to Rome!",
    status: "done",
    itinerary: [
      {
        day: 1,
        location: "Colosseum",
        description: "A historic amphitheater.",
      },
    ],
  },
];

beforeEach(() => {
  const container = document.createElement("div");
  container.id = "modal-root";
  document.body.appendChild(container);
});

afterEach(() => {
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe("Trips Component", () => {
  it("renders the Trips component correctly", () => {
    render(<Trips trips={mockTrips} />);

    expect(screen.getByText("The places you dream of")).toBeInTheDocument();
    expect(screen.getByText("Let's live new adventures")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search trips")).toBeInTheDocument();
    expect(screen.getByText("Create new trip")).toBeInTheDocument();
  });

  it("filters trips based on search input", () => {
    render(<Trips trips={mockTrips} />);

    const searchInput = screen.getByPlaceholderText("Search trips");
    fireEvent.change(searchInput, { target: { value: "Paris" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
    expect(screen.queryByText("Trip to Rome")).not.toBeInTheDocument();
  });

  it("opens the form modal when 'Create new trip' is clicked", () => {
    render(<Trips trips={mockTrips} />);

    const createTripButton = screen.getByText("Create new trip");
    fireEvent.click(createTripButton);

    expect(screen.getByText("Save")).toBeInTheDocument(); // Assuming "Save" is in the form modal
  });

  it("opens the description modal when a trip card is clicked", () => {
    render(<Trips trips={mockTrips} />);

    const tripCard = screen.getByText("Trip to Paris");
    fireEvent.click(tripCard);

    expect(screen.getByText("A wonderful trip to Paris.")).toBeInTheDocument();
  });

  it("deletes a trip when the delete button is clicked", () => {
    render(<Trips trips={mockTrips} />);

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText(mockTrips[0].title)).not.toBeInTheDocument();
  });

  it("filters trips based on the selected filter", () => {
    render(<Trips trips={mockTrips} />);

    const filterButton = screen.getByText("Completed");
    fireEvent.click(filterButton);

    expect(screen.getByText("Trip to Rome")).toBeInTheDocument();
    expect(screen.queryByText("Trip to Paris")).not.toBeInTheDocument();
  });
});
