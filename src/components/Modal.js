import React, { useEffect } from 'react';
import css from '../styles.module.css';

export function Modal(props) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        props.onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.onClose]);

  return (
    <div className={css.Overlay} onClick={props.onClose}>
      <div className={css.Modal}>
        <img src={props.largeImageURL} alt="img" />
      </div>
    </div>
  );
}
