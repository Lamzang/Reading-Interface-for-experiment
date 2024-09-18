import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function InfoComponent({ infoArray, setIsEnd, isEnd }) {
  const [page, setPage] = useState(0);
  const onClick = () => {
    if (page + 1 === infoArray.length) {
    }
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page === infoArray.length - 1) {
      setIsEnd(true);
    }
  }, [page]);
  return !isEnd ? (
    <div className={styles.InfoScreen}>
      <div className={styles.InfoWrapper} style={{ marginTop: "-300px" }}>
        <div className={styles.InfoTutorial}>{infoArray[page]}</div>
        <div className={styles.InfoButton} onClick={onClick}>
          {"확인"}
        </div>
      </div>
    </div>
  ) : null;
}
