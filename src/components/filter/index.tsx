import styles from "./styles.module.css";

interface FilterProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const Filter = ({ selectedFilter, setSelectedFilter }: FilterProps) => {
  return (
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
  );
};

export default Filter;
