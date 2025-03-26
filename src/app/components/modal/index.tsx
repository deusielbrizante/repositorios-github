import React, { useEffect } from 'react';
import styles from './styles.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, text }) => {
  useEffect(() => {
    if (isOpen)
      document.body.style.overflow = 'hidden';
    else
      document.body.style.overflow = 'auto';
  }, [isOpen]);

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : styles.hide}`} onClick={onClose}>
      <div className={`${styles.modal} ${isOpen ? styles.modalShow : styles.modalHide}`} onClick={e => e.stopPropagation()}>
        <p>{text}</p>
        <button className={styles.closeButton} onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;