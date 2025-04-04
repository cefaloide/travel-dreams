import { Trip } from "@/types";
import Modal from "@/components/baseModal";
import styles from "./styles.module.css";

type Props = {
  trip: Trip | null;
  onComplete: (id: number) => void;
  onClose: () => void;
};

const DescriptionModal = ({ trip, onComplete, onClose }: Props) => {
  if (!trip) {
    return null;
  }

  return (
    <Modal onClose={onClose} headerImg={trip.photo_url}>
      <div className={styles.modalTitle}>{trip.title}</div>
      {trip.status === "done" ? (
        <div className={styles.modalStatus}>✅ Complete</div>
      ) : (
        <div className={styles.modalStatus} onClick={() => onComplete(trip.id)}>
          ☑️ Mark as completed
        </div>
      )}
      <div className={styles.description}>{trip.description}</div>
      <div className={styles.itineraryTitle}>Itinerary</div>
      <div>
        {trip.itinerary.length === 0 ? (
          <div>No itinerary</div>
        ) : (
          <div>
            {trip.itinerary.map((item, index) => {
              return (
                <div key={item.day} className={styles.itineraryItem}>
                  <div
                    className={
                      index === trip.itinerary.length - 1
                        ? styles.lastItineraryBullet
                        : styles.itineraryBullet
                    }
                  >
                    •
                  </div>
                  <div>
                    <div className={styles.itineraryDay}>
                      Day {item.day}: {item.location}{" "}
                    </div>
                    <div className={styles.itineraryDescription}>
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DescriptionModal;
