import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig"; // Adjust path as needed

const DealEditor = ({ deal, onSave, onCancel }) => {
  const [editedAddress, setEditedAddress] = useState(deal.Address);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const dealRef = doc(db, "Deals", deal.id);
      await updateDoc(dealRef, {
        dealAddress: editedAddress,
      });
      // Call the parent's onSave function to update the list
      onSave({ ...deal, Address: editedAddress });
      console.log("Document successfully updated!");
    } catch (err) {
      console.error("Error updating document: ", err);
      setError("Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="deal-form">
      <h2>Edit Deal</h2>
      {/* Form fields for editing the deal */}
      {/* For simplicity, only editing the address here */}
      <div className="form-section"/>
        <div className="form-inline">
          <div className="form-row">
            <label>Deal Address:</label>
            <input
            type="text"
            value={editedAddress}
            onChange={(e) => setEditedAddress(e.target.value)}
            disabled={loading}
            />
          </div>
        </div>
        

        <button className="App-button" type="button" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button className="App-button" type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
    </form>

    
  );
};

export default DealEditor;