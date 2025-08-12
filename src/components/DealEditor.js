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
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h3>Editing Deal: {deal.name}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="dealAddress">Deal Address:</label>
        <input
          id="dealAddress"
          type="text"
          value={editedAddress}
          onChange={(e) => setEditedAddress(e.target.value)}
          disabled={loading}
          style={{ marginLeft: '10px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button onClick={onCancel} disabled={loading} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DealEditor;