import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase/FirebaseConfig";
import DealEditor from "./DealEditor";

const DealList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [fetched, setFetched] = useState(false); // Track if deals have been fetched
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
        let propertyName = doc.data().dealName;
        let propertyAddress = doc.data().buildingAddress;
        let propertyDealType = doc.data().dealType;
        let propertyLeaseOrSale = doc.data().leaseOrSale;
        let propertyPPSQ = doc.data().ppsq;
        let propertySaleDate = doc.data().saleDate;
        let propertySalePrice = doc.data().salePrice;
        let propertySellerName = doc.data().sellerName;
        let propertyLeaseTerm = doc.data().leaseTerm;
        let propertyLeaseRate = doc.data().leaseRate;
        let propertyLeaseDate = doc.data().leaseDate;
        let propertyLeaseExpiration = doc.data().leaseExpiration;
        let propertyAdditionalCharges = doc.data().additionalCharges;
        dealData.push({
          id: doc.id, 
          name: propertyName, 
          Address: propertyAddress, 
          Type: propertyDealType, 
          LeaseOrSale: propertyLeaseOrSale,
          PPSQ: propertyPPSQ,
          SaleDate: propertySaleDate,
          SalePrice: propertySalePrice,
          SellerName: propertySellerName,
          LeaseTerm: propertyLeaseTerm,
          LeaseRate: propertyLeaseRate,
          LeaseDate: propertyLeaseDate,
          LeaseExpiration: propertyLeaseExpiration,
          AdditionalCharges: propertyAdditionalCharges
        });
      });
      setDeals(dealData);
      setFetched(true); // Mark as fetched
    } catch (err) {
      setError("Failed to fetch deals.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDeal = (deal) => {
    setSelectedDeal(deal);
  };

  const handleSaveDeal = (updatedDeal) => {
    setDeals(deals.map(deal => deal.id === updatedDeal.id ? updatedDeal : deal));
    setSelectedDeal(null);
  };

  const handleCancelEdit = () => {
    setSelectedDeal(null);
  };

  const retrievedDeals = () => {
    if (deals.length > 0) {
      return (
        <form className="deal-form">
          <h2>Retrieved Deals:</h2>
          <div className="form-section"/>
          {deals.map((deal) => (
            <div key={deal.id} className="form-row">
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectDeal(deal); }}>
                <label>{deal.name}</label>
              </a>
            </div>
          ))}
        </form>
      );
    } else {
      return <p>No deals found. Please add a deal.</p>;
    }
  };

  return (
    <>
      <button className="App-button" onClick={fetchDeals} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Deals'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Only show deals after fetch button is clicked */}
      {fetched && !selectedDeal && retrievedDeals()}

      {/* Show DealEditor when a deal is selected */}
      {selectedDeal && (
        <DealEditor 
          deal={selectedDeal} 
          onSave={handleSaveDeal} 
          onCancel={handleCancelEdit} 
        />
      )}
    </>
  );
};

export default DealList;