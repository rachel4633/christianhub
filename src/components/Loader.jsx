import React from "react";
import "../css/Loader.css"; // import the external css
const Loader = () => {
return (
     <div className="loader-overlay">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
);
};
export default Loader;