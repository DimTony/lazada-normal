import React from "react";
import "../assets/Spinner.css"; // Import CSS for spinner styles

const Spinner = () => {
  return (
    <>
      <div className="spinner-overlay">
        <div className="spinner-container">
          <img src="/laz-ico.ico" alt="Loading..." className="spinner" />
        </div>
      </div>
    </>
  );
};

export default Spinner;
