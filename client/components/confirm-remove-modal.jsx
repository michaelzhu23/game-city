import React from 'react';

export default function ConfirmRemoveModal(props) {
  let fadeAnimation;
  let slideAnimation;
  if (props.introModal.show === true) {
    fadeAnimation = 'fade-in';
    slideAnimation = 'slide-in';
  } else {
    fadeAnimation = 'fade-out';
    slideAnimation = 'slide-out';
  }
  return (
    <div className={`modal-overlay ${fadeAnimation}`}>
      <div className={`modal-content p-4 ${slideAnimation}`}>
      </div>
    </div>
  );
}
