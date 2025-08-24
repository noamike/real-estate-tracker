import React, { useState } from "react";
import '../App.css';

const NavButtons = ({ fetchDeals, loading, showAddDeal }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (btnName, action) => {
    setSelected(btnName);
    action();
  };

  return (
    <div className="nav-buttons">
      <button
        className={`App-button ${selected === "add" ? "selected" : ""}`}
        onClick={() => handleClick("add", showAddDeal)}
      >
        Add a Deal
      </button>
      <button
        className={`App-button ${selected === "fetch" ? "selected" : ""}`}
        onClick={() => handleClick("fetch", fetchDeals)}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Deals"}
      </button>
    </div>
  );
};

export default NavButtons;
