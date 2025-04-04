import { Trip } from "@/types";
import Modal from "@/components/modal";
import styles from "./styles.module.css";
import { useState } from "react";

type Props = {
  trip?: Trip | null;
  onSave: (trip: Trip) => void;
  onClose: () => void;
};

const FormModal = ({ trip, onSave, onClose }: Props) => {
  if (!trip) {
    return null;
  }

  const [title, setTitle] = useState(trip.title);
  const [introduction, setIntroduction] = useState(trip.introduction);
  const [description, setDescription] = useState(trip.description);
  const [photo_url, setPhoto_url] = useState(trip.photo_url);
  const [itinerary, setItinerary] = useState(trip.itinerary);

  const updateItinerary = (
    selectedIndex: number,
    updatedFields: Partial<{
      day: number;
      location: string;
      description: string;
    }>
  ) => {
    const updatedItinerary = itinerary.map((item, index) =>
      selectedIndex === index ? { ...item, ...updatedFields } : item
    );
    setItinerary(updatedItinerary);
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

  const onChangeDescription = (
    selectedDescription: string,
    selectedIndex: number
  ) => {
    updateItinerary(selectedIndex, { description: selectedDescription });
  };

  const handleOnsave = () => {
    const updatedTrip = {
      id: trip.id,
      status: trip.status,
      title,
      introduction,
      description,
      photo_url,
      itinerary,
    };
    onSave(updatedTrip);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="introduction">
            Introduction (max. 240 characters)
          </label>
          <textarea
            rows={2}
            name="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            maxLength={240}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={240}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="photo_url">Image</label>
          <input
            type="text"
            name="photo_url"
            value={photo_url}
            onChange={(e) => setPhoto_url(e.target.value)}
          />
        </div>
      </form>
      Day by day itinerary
      {itinerary.map((item, index) => (
        // TODO: fix lose focus
        <div
          className={styles.itineraryItem}
          key={`${item.day}-${item.location}`}
        >
          <div>
            <input
              type="number"
              value={item.day}
              onChange={(e) => onChangeDay(Number(e.target.value), index)}
            />
          </div>
          <div className={styles.itineraryDetails}>
            <input
              type="text"
              value={item.location}
              onChange={(e) => onChangeLocation(e.target.value, index)}
            />
            <textarea
              rows={4}
              value={item.description}
              onChange={(e) => onChangeDescription(e.target.value, index)}
            />
          </div>
        </div>
      ))}
      <div className={styles.save} onClick={handleOnsave}>
        Save
      </div>
    </Modal>
  );
};

export default FormModal;
