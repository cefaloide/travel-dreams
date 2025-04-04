import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  headerImg?: string;
};

const BaseModal = ({ onClose, children, headerImg }: Props) => {
  const handleCloseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.closeWrapper}>
            <a href="#" onClick={handleCloseClick} className={styles.close}>
              x
            </a>
          </div>
          {headerImg && (
            <div
              role="img"
              className={styles.modalHeaderImg}
              style={{
                backgroundImage: `url(${headerImg})`,
              }}
            />
          )}
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default BaseModal;
