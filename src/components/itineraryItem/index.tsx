import { useState } from "react";
import styles from "./styles.module.css";
import { ItineraryItemType } from "@/types";

interface Props {
  item?: ItineraryItemType;
  index: number;
  onChangeDay: (value: number, index: number) => void;
  onChangeLocation: (value: string, index: number) => void;
  onChangeDescription: (value: string, index: number) => void;
}

export const ItineraryItem = ({
  item,
  index,
  onChangeDay,
  onChangeLocation,
  onChangeDescription,
}: Props) => {
  const [day, setDay] = useState(item?.day);
  const [location, setLocation] = useState(item?.location);
  const [description, setDescription] = useState(item?.description);

  const handleOnChangeDay = (value: number, index: number): void => {
    setDay(value);
    onChangeDay(value, index);
  };
  const handleOnChangeLocation = (value: string, index: number) => {
    setLocation(value);
    onChangeLocation(value, index);
  };
  const handleOnChangeDescription = (value: string, index: number) => {
    setDescription(value);
    onChangeDescription(value, index);
  };

  return (
    <div className={styles.itineraryItem}>
      <div>
        <input
          type="number"
          placeholder="Day"
          value={day}
          onChange={(e) => handleOnChangeDay(Number(e.target.value), index)}
        />
      </div>
      <div className={styles.itineraryDetails}>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => handleOnChangeLocation(e.target.value, index)}
        />
        <textarea
          rows={4}
          placeholder="Description"
          value={description}
          onChange={(e) => handleOnChangeDescription(e.target.value, index)}
        />
      </div>
    </div>
  );
};

export default ItineraryItem;
