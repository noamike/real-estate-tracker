import React, { useState } from "react";
import DealList from './DealList';
import NavButtons from './NavButtons';
import AddDealForm from './AddDealForm';
import { collection, query, where, getDocs } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase/FirebaseConfig";

const DealComponent = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [activeView, setActiveView] = useState(""); // "add" or "list"
  const { userID } = useAuth();

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    setSelectedDeal(null);
    try {
      const q = query(collection(db, 'Deals'), where("mainAgent", "==", userID));
      const querySnapshot = await getDocs(q);
      const dealData = [];
      querySnapshot.forEach((doc) => {
        dealData.push({ id: doc.id, ...doc.data() });
      });
      setDeals(dealData);      // <-- This updates the deals state
      setFetched(true);        // <-- This triggers DealList to show
      setActiveView("list");   // <-- This shows DealList
    } catch (err) {
      setError("Failed to fetch deals.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowAddDeal = () => {
    setActiveView("add"); // Show AddDealForm
  };

  return (
    <section className='App-content'>
      <NavButtons
        fetchDeals={fetchDeals}
        loading={loading}
        showAddDeal={handleShowAddDeal}
      />
      {activeView === "add" && <AddDealForm />}
      {activeView === "list" && (
        <DealList
          deals={deals}
          loading={loading}
          error={error}
          fetched={fetched}
          selectedDeal={selectedDeal}
          setSelectedDeal={setSelectedDeal}
          setDeals={setDeals}
          handleSaveDeal={(updatedDeal) => {
            setDeals(deals.map(deal => deal.id === updatedDeal.id ? updatedDeal : deal));
            setSelectedDeal(null);
          }}
          handleCancelEdit={() => setSelectedDeal(null)}
        />
      )}
    </section>
  );
};

export default DealComponent;