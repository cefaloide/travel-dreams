"use client";
import { Trip } from "@/types";
import { useState, useEffect } from "react";
import TripCard from "@/components/tripcard/index";
import DescriptionModal from "@/components/descriptionModal";
import FormModal from "@/components/formModal";

type Props = {
  trips: Trip[];
};
const Trips = ({ trips }: Props) => {
  const [currentTrips, setCurrentTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

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

  const handleShowDescriptionModal = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowDescriptionModal(true);
  };

  const handleShowFormModal = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowFormModal(true);
  };

  const onSaveEdit = (trip: Trip) => {
    const updatedTrips = currentTrips.map((item) =>
      item.id === trip.id ? { ...item, ...trip } : item
    );
    setCurrentTrips(updatedTrips);
    setShowFormModal(false);
    setSelectedTrip(null);
  };

  const handleOnComplete = (id: number) => {
    const updatedTrips = currentTrips.map((trip) =>
      trip.id === id ? { ...trip, status: "done" } : trip
    );
    setCurrentTrips(updatedTrips);
    setSelectedTrip(updatedTrips.find((trip) => trip.id === id) || null);
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
          showDescriptionModal={handleShowDescriptionModal}
          showFormModal={handleShowFormModal}
        />
      ))}

      {showDescriptionModal && (
        <DescriptionModal
          trip={selectedTrip}
          onClose={() => setShowDescriptionModal(false)}
          onComplete={handleOnComplete}
        />
      )}

      {showFormModal && (
        <FormModal
          trip={selectedTrip}
          onClose={() => setShowFormModal(false)}
          onSave={onSaveEdit}
        />
      )}
    </>
  );
};
export default Trips;
