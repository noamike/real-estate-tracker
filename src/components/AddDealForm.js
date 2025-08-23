/*
 * Deals Schema Needs to look as follows:
 * Deals
 * * Deal Name
 * * * Deal Location
 * * * *Subcollections
 * * * * Update 1
 * * * * Update 2
 * 
 * see if we can create this from here
*/
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import {db} from "../firebase/FirebaseConfig";
import useAuth from '../hooks/useAuth';
import {useState} from 'react';
import { render } from "@testing-library/react";

const AddDeal = () =>{
    //create variables to use later 
    const {userID} = useAuth();
    const [isLease, setIsLease] = useState(false);
    const [isSale, setIsSale] = useState(false);
    //1. Form Data tables
    const [dealData, setDealData] = useState({
        leaseOrSale:'',
        dealType:'',
        dealName: '',
        buildingAddress: '',
        buildingSize:'',
        leasedSpace:'',
        mainAgent: '',
        //Values if deal is a lease:
        leaseTerm:'',
        leaseDate:'',
        leaseExpiration:'',
        leaseRate:'',
        additionalCharges:'',
        //Values if deal is a Sale
        sellerName:'',
        saleDate:'',
        salePrice:'',
        ppsq:'', //price per square foot
    });

    //2. Handle changes when typing in a form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setDealData(prevData=>({
            ...prevData,
            [name]: value
        }));
    };

    //3. Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            //create a doc and setting the deal ID to be the name
            const newDealRef = collection(db, 'Deals');
            if(dealData.dealType === 'lease'){
                await addDoc(newDealRef, {
                    dealType: dealData.dealType,                    
                    leaseOrSale: dealData.leaseOrSale,                    
                    dealName: dealData.dealName,
                    buildingAddress: dealData.buildingAddress,                    
                    leaseTerm: dealData.leaseTerm,
                    leaseDate: dealData.leaseDate,
                    leaseExpiration: dealData.leaseExpiration,
                    additionalCharges: dealData.additionalCharges,
                    mainAgent: userID
                });
            }
            if(dealData.leaseOrSale === 'sale'){
                await addDoc(newDealRef, {
                    dealType: dealData.dealType,                    
                    leaseOrSale: dealData.leaseOrSale,                    
                    dealName: dealData.dealName,
                    buildingAddress: dealData.buildingAddress,                    
                    sellerName: dealData.sellerName,
                    saleDate: dealData.saleDate,
                    salePrice: dealData.salePrice,
                    ppsq: dealData.ppsq,
                    mainAgent: userID
                });
             }

            console.log('Document Successfully Written');
            alert('Deal Added Successfully');

            //clear form
            setDealData({
                leaseOrSale:'',
                dealType:'',
                dealName: '',
                buildingAddress: '',
                mainAgent: '',
            });
        } catch{
            console.log('Error adding document');
            alert('Failed to add deal');
        }

        //4. Decide whether dropdown was picked between lease or sale
        const handleLeaseOrSale = () =>{

        };

    };
    //5. Decide whether dropdown was picked between office, retail, or industrial
    const [selectedOption, setSelectedOption] = useState('');
    const handleDealType = (event) =>{
        setSelectedOption(event.target.value);

    };
    const renderType = () =>{
        if(selectedOption === 'office' || selectedOption === 'retail'){
            return(
                <div className="form-row">
                    <label>Choose Lease or Sale:</label>
                    <div className="radio-group">
                        <input
                        type="radio"
                        id="lease"
                        value="lease"
                        name="leaseOrSale"
                        onChange={handleChange}
                        />
                        <label htmlFor="lease">Lease</label>

                        <input
                        type="radio"
                        id="sale"
                        value="sale"
                        name="leaseOrSale"
                        onChange={handleChange}
                        />
                        <label htmlFor="sale">Sale</label>
                    </div>
                </div>

            )
        }
        else if(selectedOption === 'industrial'){
            dealData.leaseOrSale = 'sale';
            dealData.dealType = 'industrial';
        }
    };

    const buildingNameAndAddress = () =>{
        return(
            <div>
                <div className="form-row">
                    <label>Deal Name:</label>
                    <input
                        type="text"
                        name='dealName'
                        value={dealData.dealName}
                        onChange={handleChange}
                        placeholder="Deal Name"
                        required
                    />
                </div>
                <div className="form-row">
                    <label>Building Address:</label>
                    <input
                        type="text"
                        name='buildingAddress'
                        value={dealData.buildingAddress}
                        onChange={handleChange}
                        placeholder="Property Address"
                        required
                    />
                </div>
            </div>
        )
    };
    return(
        <form onSubmit={handleSubmit} className="deal-form">
            <h2>Add a New Deal</h2>

            {/* Deal Type */}
            <div className="form-row">
                <label htmlFor="dealType">Deal Type:</label>
                <select id="dealType" name="dealType" value={selectedOption} onChange={handleDealType} required>
                    <option value="none"></option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                    <option value="industrial">Industrial</option>
                </select>
                {renderType()}
            </div>

            {/* Lease-specific fields */}
            {dealData.leaseOrSale === "lease" && (
                <div className="form-section">
                <h4>Lease Details</h4>
                {buildingNameAndAddress()}

                <div className="form-row">
                    <label>Lease Term & Rate:</label>
                    <div className="form-inline">
                    <input
                        type="text"
                        name="leaseTerm"
                        value={dealData.leaseTerm}
                        onChange={handleChange}
                        placeholder="Lease Term"
                    />
                    <input
                        type="text"
                        name="leaseRate"
                        value={dealData.leaseRate}
                        onChange={handleChange}
                        placeholder="Lease Rate"
                    />
                    </div>
                </div>

                <div className="form-row">
                    <label>Lease Start and End Date:</label>
                    <div className="form-inline">
                    <input
                        type="date"
                        name="leaseDate"
                        value={dealData.leaseDate}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="leaseExpiration"
                        value={dealData.leaseExpiration}
                        onChange={handleChange}
                    />
                    </div>
                </div>

                <div className="form-row">
                    <label>Additional Charges:</label>
                    <input
                    type="text"
                    name="additionalCharges"
                    value={dealData.additionalCharges}
                    onChange={handleChange}
                    placeholder="Additional Charges"
                    />
                </div>
                </div>
            )}

            {/* Sale-specific fields */}
            {dealData.leaseOrSale === "sale" && (
                <div className="form-section">
                <h4>Sale Details</h4>
                {buildingNameAndAddress()}

                <div className="form-row">
                    <label>Seller Name:</label>
                    <input
                    type="text"
                    name="sellerName"
                    value={dealData.sellerName}
                    onChange={handleChange}
                    placeholder="Seller Name"
                    />
                </div>

                <div className="form-row">
                    <label>Sale Date:</label>
                    <input
                    type="date"
                    name="saleDate"
                    value={dealData.saleDate}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <label>Sale Price:</label>
                    <input
                    type="number"
                    name="salePrice"
                    value={dealData.salePrice}
                    onChange={handleChange}
                    placeholder="Sale Price"
                    />
                </div>

                <div className="form-row">
                    <label>Price per Square Foot:</label>
                    <input
                    type="number"
                    name="ppsq"
                    value={dealData.ppsq}
                    onChange={handleChange}
                    placeholder="Price Per Sq Ft"
                    />
                </div>
                </div>
            )}

            <h3>Deal will be saved with user {userID} as main Agent</h3>

            <div className="form-row button-row">
                <button type="submit" className="App-button">Submit</button>
            </div>
            </form>

    );
};
export default AddDeal;