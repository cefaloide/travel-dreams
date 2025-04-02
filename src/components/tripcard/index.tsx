import { Trip } from "@/types";
import styles from "./styles.module.css";

type Props = {
  trip: Trip;
};
const TripCard = ({ trip }: Props) => {
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
      </div>
    </div>
  );
};
export default TripCard;
