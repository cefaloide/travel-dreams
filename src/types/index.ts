export type Trip = {
  id: number;
  title: string;
  description: string;
  photo_url: string;
  introduction: string;
  status: string;
  itinerary: { day: number; location: string; description: string }[];
};
