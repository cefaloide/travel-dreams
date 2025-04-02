import TripCard from "../components/tripcard";
import { Trip } from "@/types";

export default async function Page() {
  const data: Response = await fetch(
    "https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels"
  );
  const trips: Trip[] = await data.json();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>The places you dream of</h1>
      <h2 style={{ textAlign: "center" }}>Let's live new adventures</h2>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
