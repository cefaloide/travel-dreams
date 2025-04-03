"use client";
import { Trip } from "@/types";
import { useState, useEffect } from "react";
import TripCard from "@/components/tripcard/index";

type Props = {
  trips: Trip[];
};
const Trips = ({ trips }: Props) => {
  const [currentTrips, setCurrentTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredTrips = trips.filter(
      (trip) =>
        trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentTrips(filteredTrips);
  };

  const handleDelete = (id: number) => {
    const filteredTrips = currentTrips.filter((trip) => trip.id !== id);
    setCurrentTrips(filteredTrips);
  };

  const handleOnComplete = (id: number) => {
    const updatedTrips = currentTrips.map((trip) =>
      trip.id === id ? { ...trip, status: "done" } : trip
    );
    setCurrentTrips(updatedTrips);
  };

  useEffect(() => {
    setCurrentTrips(trips);
    console.log("setCurrentTrips All trips:", trips);
  }, [trips]);

  return (
    <>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search trips"
            onChange={onChangeSearch}
            value={searchTerm}
          />{" "}
          <button type="submit">Search</button>
        </form>
      </div>
      {currentTrips.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          onDelete={handleDelete}
          onComplete={handleOnComplete}
        />
      ))}
    </>
  );
};
export default Trips;
