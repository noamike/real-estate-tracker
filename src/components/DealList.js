import { collection, query, where, getDocs } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase/FirebaseConfig";
import React, { useState } from "react";
import DealEditor from "./DealEditor"; // Import the new component

const DealList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null); // New state to track selected deal
  const { userID } = useAuth();

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    setSelectedDeal(null); // Clear selected deal when fetching
    try {
      console.log('Attempting to Query Database');
      // Query to fetch deals where mainAgent matches userID
      const q = query(collection(db, 'Deals'), where("mainAgent", "==", userID));
      const querySnapshot = await getDocs(q);

      // Process the fetched documents
      const dealData = [];
      querySnapshot.forEach((doc) => {
        let propertyName = doc.data().dealName;
        let propertyAddress = doc.data().buildingAddress;
        console.log("Deal name is: ", propertyName);
        dealData.push({ id: doc.id, name: propertyName, Address: propertyAddress });
      });
      setDeals(dealData);
    } catch (err) {
      console.error("Error fetching deals: ", err);
      setError("Failed to fetch deals.");
    } finally {
      setLoading(false);
    }

    
  };

  // Handler for selecting a deal to edit
  const handleSelectDeal = (deal) => {
    setSelectedDeal(deal);
  };

  // Handler for saving changes from DealEditor
  const handleSaveDeal = (updatedDeal) => {
    // Update the deal in the local state array
    setDeals(deals.map(deal => deal.id === updatedDeal.id ? updatedDeal : deal));
    setSelectedDeal(null); // Exit edit mode
  };

  // Handler to cancel editing
  const handleCancelEdit = () => {
    setSelectedDeal(null); // Exit edit mode
  };

  return (
    <div>
      <button className="App-button" onClick={fetchDeals} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Deals'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Conditionally render either the list or the editor */}
      {selectedDeal ? (
        <DealEditor 
          deal={selectedDeal} 
          onSave={handleSaveDeal} 
          onCancel={handleCancelEdit} 
        />
      ) : (
        <ul>
          {deals.length > 0 ? (
            deals.map((deal) => (
              <div key={deal.id} className="" style={{ cursor: 'pointer'}}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleSelectDeal(deal); }}>
                  <h3>{deal.name}</h3>
                </a>
              </div>
            ))
          ) : (
            <p>No deals found. Click "Fetch Deals" to load them.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default DealList;