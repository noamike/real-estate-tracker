import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig"; // Adjust path as needed

const DealEditor = ({ deal, onSave, onCancel }) => {
  const [editedAddress, setEditedAddress] = useState(deal.Address);
  const [editedName, setEditedName] = useState(deal.name);
  const [editedType, setEditedType] = useState(deal.Type || "");
  const [editedLeaseOrSale, setEditedLeaseOrSale] = useState(deal.LeaseOrSale || "");
  const [editedPPSQ, setEditedPPSQ] = useState(deal.PPSQ || "");
  const [editedSaleDate, setEditedSaleDate] = useState(deal.SaleDate || "");
  const [editedSalePrice, setEditedSalePrice] = useState(deal.SalePrice || "");
  const [editedSellerName, setEditedSellerName] = useState(deal.SellerName || "");
  const [editedLeaseTerm, setEditedLeaseTerm] = useState(deal.LeaseTerm || "");
  const [editedLeaseDate, setEditedLeaseDate] = useState(deal.LeaseDate || "");
  const [editedLeaseExpiration, setEditedLeaseExpiration] = useState(deal.LeaseExpiration || "");
  const [editedAdditionalCharges, setEditedAdditionalCharges] = useState(deal.AdditionalCharges || "");
  const [editedLeaseRate, setEditedLeaseRate] = useState(deal.LeaseRate || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const dealRef = doc(db, "Deals", deal.id);

        await updateDoc(dealRef, {
          dealType: editedType,
          leaseOrSale: editedLeaseOrSale,
          dealName: editedName,
          buildingAddress: editedAddress,

          //Sale Variables to Save
          ppsq: editedPPSQ,
          saleDate: editedSaleDate,
          salePrice: editedSalePrice,
          sellerName: editedSellerName,

          // Lease Variables to Save
          leaseTerm: editedLeaseTerm,
          leaseDate: editedLeaseDate,
          leaseExpiration: editedLeaseExpiration,
          leaseRate: editedLeaseRate,
          additionalCharges: editedAdditionalCharges          
        });

      // Call the parent's onSave function to update the list
      onSave({
          ...deal,
          Type: editedType,
          LeaseOrSale: editedLeaseOrSale, 
          Name: editedName, 
          Address: editedAddress, 

          // Sale Variables to save
          SellerName: editedSellerName,
          SaleDate: editedSaleDate, 
          SalePrice: editedSalePrice,
          PPSQ: editedPPSQ,
          
          // Lease Variables to Save
          LeaseTerm: editedLeaseTerm,
          LeaseRate: editedLeaseRate,
          LeaseDate: editedLeaseDate,
          LeaseExpiration: editedLeaseExpiration,
          AdditionalCharges: editedAdditionalCharges
        });
      

      
      console.log("Document successfully updated!");
    } catch (err) {
      console.error("Error updating document: ", err);
      setError("Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  const editDefaults = () =>{
        return(
            <>
              <div className="form-section"/>
                <div className="form-inline">
                  <div className="form-row">
                    <label>Deal Name:</label>
                    <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    disabled={loading}
                    />
                  </div>
                </div>
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
                <div className="form-inline">
                  <div className="form-row">
                    <label>Deal Type:</label>
                    <input
                    type="text"
                    value={editedType}
                    onChange={(e) => setEditedType(e.target.value)}
                    disabled={loading}
                    />
                  </div>
                </div>
                <div className="form-inline">
                  <div className="form-row">
                    <label>Update Lease Or Sale: </label>
                    <input
                    type="text"
                    value={editedLeaseOrSale}
                    onChange={(e) => setEditedLeaseOrSale(e.target.value)}
                    disabled={loading}
                    />
                  </div>
                </div>
            </>
        )
    };

  return (
    <form className="deal-form">
      <h2>Edit Deal</h2>
      {/* Form fields for editing the deal */}
      {/* For simplicity, only editing the address here */}
      {deal.LeaseOrSale === 'lease' && (
        <>
          {editDefaults()}
          <div className="form-inline">
            <div className="form-row">
              <label>Lease Term: </label>
              <input
              type="number"
              value={editedLeaseTerm}
              onChange={(e) => setEditedLeaseTerm(e.target.value)}
              disabled={loading}
              />
            </div>
          </div>
          <div className="form-inline">
            <div className="form-row">
              <label>Lease Rate: </label>
              <input
              type="number"
              value={editedLeaseRate}
              onChange={(e) => setEditedLeaseRate(e.target.value)}
              disabled={loading}
              />
            </div>
          </div>
          <div className="form-inline">
            <div className="form-row">
              <label>Lease Start Date: </label>
              <input
              type="date"
              value={editedLeaseDate}
              onChange={(e) => setEditedLeaseDate(e.target.value)}
              disabled={loading}
              />
            </div>
          </div>
          <div className="form-inline">
            <div className="form-row">
              <label>Lease Expiration Date: </label>
              <input
              type="date"
              value={editedLeaseExpiration}
              onChange={(e) => setEditedLeaseExpiration(e.target.value)}
              disabled={loading}
              />
            </div>
          </div>
          <div className="form-inline">
            <div className="form-row">
              <label>Additional Charges: </label>
              <input
              type="text"
              value={editedAdditionalCharges}
              onChange={(e) => setEditedAdditionalCharges(e.target.value)}
              disabled={loading}
              />
            </div>
          </div>
        </>
      )}

      {deal.LeaseOrSale === 'sale' && (
        <>
          {editDefaults()}
          <div className="form-inline">
            <div className="form-row">
              <label>Price per Square Foot: </label>
              <input
              type="number"
              value={editedPPSQ}
              onChange={(e) => setEditedPPSQ(e.target.value)}
              disabled={loading}
              />
            </div>
          </div>
          <div className="form-inline">
            <div className="form-row">
              <label>Sale Date: </label>
              <input
              type="date"
              value={editedSaleDate}
              onChange={(e) => setEditedSaleDate(e.target.value)}
              disabled={loading}
              />
            </div>
          </div>
          <div className="form-inline">
            <div className="form-row">
              <label>Sale Price: </label>
              <input
              type="number"
              value={editedSalePrice}
              onChange={(e) => setEditedSalePrice(e.target.value)}
              disabled={loading}
              />
            </div>
          </div>
          <div className="form-inline">
            <div className="form-row">
              <label>Seller Name: </label>
              <input
              type="text"
              value={editedSellerName}
              onChange={(e) => setEditedSellerName(e.target.value)}
              disabled={loading}
              />
            </div>
          </div>

        </>
      )}
      
        
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