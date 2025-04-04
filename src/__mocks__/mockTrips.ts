import { Trip } from "@/types";

export const mockTrips: Trip[] = [
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
      {
        day: 2,
        location: "Louvre Museum",
        description: "Home to the Mona Lisa.",
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
