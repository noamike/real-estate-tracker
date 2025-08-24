import React, { useState } from "react";
import '../App.css';
import useAuth from '../hooks/useAuth';

const NavButtons = ({ fetchDeals, loading, showAddDeal, showAddContact, showContactList, showContacts }) => {
  const [selected, setSelected] = useState(null);
  const { userID } = useAuth();

  const handleClick = (btnName, action) => {
    setSelected(btnName);
    action();
  };

  return (
    <div className="nav-buttons">
      {showAddDeal && (
        <button
          className={`App-button ${selected === "add" ? "selected" : ""}`}
          onClick={() => handleClick("add", showAddDeal)}
        >
          Add a Deal
        </button>
      )}
      {fetchDeals && (
        <button
            className={`App-button ${selected === "fetch" ? "selected" : ""}`}
            onClick={() => handleClick("fetch", fetchDeals)}
            disabled={loading || !userID}
            >
            {loading ? "Loading..." : "Fetch Deals"}
        </button>

      )}
      {showAddContact && (
        <button
          className={`App-button ${selected === "contact" ? "selected" : ""}`}
          onClick={() => handleClick("contact", showAddContact)}
        >
          Add a Contact
        </button>
      )}
      {showContactList && (
        <button
          className={`App-button ${selected === "showContacts" ? "selected" : ""}`}
          onClick={() => handleClick("showContacts", showContactList)}
          disabled={showContacts}
        >
          Show Contacts
        </button>
      )}
    </div>
  );
};

export default NavButtons;
