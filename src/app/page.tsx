import Trips from "@/components/trips";
import { Trip } from "@/types";
import styles from "./page.module.css";

export default async function Page() {
  const data: Response = await fetch(
    "https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels"
  );
  const trips: Trip[] = await data.json();

  return (
    <div className={styles.page}>
      <h1 className={styles.text}>The places you dream of</h1>
      <h2 className={styles.text}>Let's live new adventures</h2>
      <Trips trips={trips} />
      <div id="modal-root"></div>
    </div>
  );
}
