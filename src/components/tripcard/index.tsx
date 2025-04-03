import { Trip } from "@/types";
import styles from "./styles.module.css";
import Modal from "@/components/modal";
import { useState } from "react";
import DescriptionModal from "../descriptionModal";
import EditModal from "../editModal";
type Props = {
  trip: Trip;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
};
const TripCard = ({ trip, onDelete, onComplete }: Props) => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={styles.left}
        style={{
          backgroundImage: `url(${trip.photo_url})`,
        }}
      ></div>
      <div className={styles.right}>
        <div className={styles.title}>{trip.title}</div>
        <div className={styles.description}>{trip.description}</div>
        <div className={styles.actions}>
          <div
            className={styles.seeDetails}
            onClick={() => setShowDescriptionModal(true)}
          >
            See trip details
          </div>
          <div className={styles.edit} onClick={() => setShowEditModal(true)}>
            Edit
          </div>
          <div className={styles.delete} onClick={() => onDelete(trip.id)}>
            Delete
          </div>
        </div>
      </div>
      {showDescriptionModal && (
        <DescriptionModal
          trip={trip}
          onClose={() => setShowDescriptionModal(false)}
          onComplete={onComplete}
        />
      )}

      {showEditModal && (
        <EditModal
          trip={trip}
          onClose={() => setShowEditModal(false)}
          onSave={onSaveEdit}
        />
      )}
    </div>
  );
};
export default TripCard;
