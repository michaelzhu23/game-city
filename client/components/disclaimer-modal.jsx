import React from 'react';

export default function DisclaimerModal(props) {
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
        <span>Game City is a full-stack web application built with React.js & Node.js/Express and was created for demonstration purposes only.
          <hr />
            Check the box below to acknowledge that the merchandise displayed here is not available for purchase, that you will not provide genuine financial or personal information, and that you are aware no purchases will truly be processed.
        </span>
        <form onSubmit={props.toggleIntroModal} className="mt-3">
          <div className="form-check mb-3">
            <input required type="checkbox" className="form-check-input" id="acknowledgement" />
            <label className="form-check-label" htmlFor="acknowledgement">I acknowledge that this is strictly a demo application.</label>
          </div>
          <button type="submit" className="btn btn-danger w-100">Continue</button>
        </form>
      </div>
    </div>
  );
}
