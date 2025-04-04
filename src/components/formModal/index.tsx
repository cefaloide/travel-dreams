import { Trip } from "@/types";
import Modal from "@/components/baseModal";
import styles from "./styles.module.css";
import { useState } from "react";
import ItineraryItem from "../itineraryItem";

type Props = {
  trip?: Trip | null;
  onSave: (trip: Trip) => void;
  onClose: () => void;
};

const FormModal = ({ trip, onSave, onClose }: Props) => {
  if (!trip) {
    return null;
  }

  const [selectedTrip, setSelectedTrip] = useState<Trip>(trip);
  const [itinerary, setItinerary] = useState(trip.itinerary);

  const onchangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedTrip({ ...selectedTrip, title: e.target.value });

  const onChangeIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setSelectedTrip({ ...selectedTrip, introduction: e.target.value });

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setSelectedTrip({ ...selectedTrip, description: e.target.value });

  const onChangePhotoUrl = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedTrip({ ...selectedTrip, photo_url: e.target.value });

  const updateItinerary = (
    selectedIndex: number,
    updatedFields: Partial<{
      day: number;
      location: string;
      description: string;
    }>
  ) => {
    const updatedItinerary = selectedTrip.itinerary.map((item, index) =>
      selectedIndex === index ? { ...item, ...updatedFields } : item
    );
    setSelectedTrip({ ...selectedTrip, itinerary: updatedItinerary });
  };

  const onChangeDay = (selectedDay: number, selectedIndex: number) => {
    updateItinerary(selectedIndex, { day: selectedDay });
  };

  const onChangeLocation = (
    selectedLocation: string,
    selectedIndex: number
  ) => {
    updateItinerary(selectedIndex, { location: selectedLocation });
  };

  const onChangeItineraryDescription = (
    selectedDescription: string,
    selectedIndex: number
  ) => {
    updateItinerary(selectedIndex, { description: selectedDescription });
  };

  const handleOnsave = () => {
    onSave(selectedTrip);
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.title}>Create a trip</div>
      <form>
        <div className={styles.field}>
          <label htmlFor="title">Name</label>
          <input
            type="text"
            name="title"
            value={selectedTrip.title}
            onChange={onchangeTitle}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="introduction">
            Introduction (max. 240 characters)
          </label>
          <textarea
            rows={2}
            name="introduction"
            value={selectedTrip.introduction}
            onChange={onChangeIntroduction}
            maxLength={240}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            name="description"
            value={selectedTrip.description}
            onChange={onChangeDescription}
            maxLength={240}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="photo_url">Image</label>
          <input
            type="text"
            name="photo_url"
            value={selectedTrip.photo_url}
            onChange={onChangePhotoUrl}
          />
        </div>
      </form>
      Day by day itinerary
      {itinerary.map((item, index) => (
        <ItineraryItem
          item={item}
          index={index}
          key={`${item.day}-${item.location}`}
          onChangeDay={onChangeDay}
          onChangeLocation={onChangeLocation}
          onChangeDescription={onChangeItineraryDescription}
        />
      ))}
      <div className={styles.save} onClick={handleOnsave}>
        Save
      </div>
    </Modal>
  );
};

export default FormModal;
