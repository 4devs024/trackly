

import React from "react";

import "./popup.css";

export default function Popup({isOpen, onClose, children}) {

  if (!isOpen) return null;
  
  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}