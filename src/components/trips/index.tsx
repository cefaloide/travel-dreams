"use client";
import { Trip } from "@/types";
import { useState, useEffect } from "react";
import TripCard from "@/components/tripcard/index";
import DescriptionModal from "@/components/descriptionModal";
import FormModal from "@/components/formModal";
import styles from "./styles.module.css";

type Props = {
  trips: Trip[];
};
const Trips = ({ trips }: Props) => {
  const [currentTrips, setCurrentTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredTrips = currentTrips.filter(
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

  const handleonChangeStatus = (id: number, newStatus: string) => {
    const updatedTrips = currentTrips.map((trip) =>
      trip.id === id ? { ...trip, status: newStatus } : trip
    );
    setCurrentTrips(updatedTrips);
    setSelectedTrip(updatedTrips.find((trip) => trip.id === id) || null);
  };

  useEffect(() => {
    setCurrentTrips(trips);
  }, [trips]);

  return (
    <>
      <div className={styles.search}>
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

      <div className={styles.filter}>
        <div
          className={
            selectedFilter === "all"
              ? styles.selectedFilter
              : styles.notSelectedFilter
          }
          onClick={() => setSelectedFilter("all")}
        >
          All
        </div>
        <div
          className={
            selectedFilter === "todo"
              ? styles.selectedFilter
              : styles.notSelectedFilter
          }
          onClick={() => setSelectedFilter("todo")}
        >
          Upcoming
        </div>
        <div
          className={
            selectedFilter === "done"
              ? styles.selectedFilter
              : styles.notSelectedFilter
          }
          onClick={() => setSelectedFilter("done")}
        >
          Completed
        </div>
      </div>

      {currentTrips
        .filter(
          (trip) => selectedFilter === "all" || trip.status === selectedFilter
        )
        .map((trip) => (
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
          onChangeStatus={handleonChangeStatus}
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
