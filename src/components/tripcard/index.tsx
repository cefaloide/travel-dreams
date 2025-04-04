import { Trip } from "@/types";
import styles from "./styles.module.css";

type Props = {
  trip: Trip;
  onDelete: (id: number) => void;
  showDescriptionModal: (trip: Trip) => void;
  showFormModal: (trip: Trip) => void;
};
const TripCard = ({
  trip,
  onDelete,
  showDescriptionModal,
  showFormModal,
}: Props) => {
  return (
    <div className={styles.container}>
      <div
        role="img"
        className={styles.left}
        style={{
          backgroundImage: `url(${trip.photo_url})`,
        }}
      />
      <div className={styles.right}>
        <div className={styles.title}>{trip.title}</div>
        <div className={styles.description}>{trip.description}</div>
        <div className={styles.actions}>
          <div
            className={styles.seeDetails}
            onClick={() => showDescriptionModal(trip)}
          >
            See trip details
          </div>
          <div className={styles.edit} onClick={() => showFormModal(trip)}>
            Edit
          </div>
          <div className={styles.delete} onClick={() => onDelete(trip.id)}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
export default TripCard;
