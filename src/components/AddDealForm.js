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
    const {userEmail, userID} = useAuth();
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

        try {
            const newDealRef = collection(db, 'Deals');
            if (dealData.leaseOrSale === 'lease') {
                await addDoc(newDealRef, {
                    dealType: dealData.dealType,
                    leaseOrSale: dealData.leaseOrSale,
                    dealName: dealData.dealName,
                    buildingAddress: dealData.buildingAddress,
                    leaseTerm: dealData.leaseTerm,
                    leaseDate: dealData.leaseDate,
                    leaseExpiration: dealData.leaseExpiration,
                    leaseRate: dealData.leaseRate,
                    additionalCharges: dealData.additionalCharges,
                    mainAgent: userID
                });
            } else if (dealData.leaseOrSale === 'sale') {
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
            } else {
                alert('Please select Lease or Sale.');
                return;
            }

            console.log('Document Successfully Written');
            alert('Deal Added Successfully');

            //clears form
            setDealData({
                leaseOrSale:'',
                dealType:'',
                dealName: '',
                buildingAddress: '',
                mainAgent: '',
                leaseTerm:'',
                leaseDate:'',
                leaseExpiration:'',
                leaseRate:'',
                additionalCharges:'',
                sellerName:'',
                saleDate:'',
                salePrice:'',
                ppsq:'',
            });

            // Resets the two dropdowns too
            setSelectedDealTypeOption('');
            setSelectedLeaseOrSaleOption('');

        } catch {
            console.log('Error adding document');
            alert('Failed to add deal');
        }

        //4. Decide whether dropdown was picked between lease or sale
        const handleLeaseOrSale = () =>{

        };

    };
    //5. Decide whether dropdown was picked between office, retail, or industrial
    const [selectedDealTypeOption, setSelectedDealTypeOption] = useState('');
    const handleDealType = (event) => {
        const value = event.target.value;
        setSelectedDealTypeOption(value);

        if (value === '') {
            setDealData(prev => ({
                ...prev,
                dealType: '',
                leaseOrSale: ''
            }));
            setSelectedLeaseOrSaleOption('');
            return;
        }

        if (value === 'industrial') {
            setDealData(prev => ({
                ...prev,
                dealType: 'industrial',
                leaseOrSale: 'sale'
            }));
            setSelectedLeaseOrSaleOption('sale');
        } else {
            setDealData(prev => ({
                ...prev,
                dealType: value,
                leaseOrSale: '' // reset leaseOrSale for office/retail
            }));
            setSelectedLeaseOrSaleOption('');
        }
    };

    const [selectedLeaseOrSaleOption, setSelectedLeaseOrSaleOption] = useState('');
    const handleLeaseOrSaleOption = (event) => {
        const value = event.target.value;
        setSelectedLeaseOrSaleOption(value);
        
        if(value === 'lease'){
            setDealData(prev => ({
                ...prev,
                leaseOrSale: 'lease'
            }));
        } else if(value === 'sale'){
            setDealData(prev => ({
                ...prev,
                leaseOrSale: 'sale'
            }));
        } else {
            setDealData(prev => ({
                ...prev,
                leaseOrSale: ''
            }));
        }
    };

    const renderDealType = () => {
        if (selectedDealTypeOption === 'office' || selectedDealTypeOption === 'retail') {
            return (
                <div className="form-row">
                    <label htmlFor="leaseOrSale">Choose Lease or Sale:</label>
                    <select id="leaseOrSale" name="leaseOrSale" value={selectedLeaseOrSaleOption} onChange={handleLeaseOrSaleOption} required>
                        <option value=""></option>
                        <option value="lease">Lease</option>
                        <option value="sale">Sale</option>
                    </select>
                </div>
            );
        } else {
            return null;
        }
    };

    const buildingNameAndAddress = () =>{
        return(
            <>
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
            </>
        )
    };

    const renderStatusMessage = () => {
    if (dealData.dealType === "") {
        return <div>Please select a Deal Type to continue.</div>;
    } else if (dealData.leaseOrSale === "") {
        return <div>Please select Lease or Sale to continue.</div>;
    } else {
        return null;
    }
};

    return(
        <form onSubmit={handleSubmit} className="deal-form">
            <h2>Add a New Deal</h2>

            {/* Deal Type */}
            <div className="form-row">
                <label htmlFor="dealType">Deal Type:</label>
                <select id="dealType" name="dealType" value={selectedDealTypeOption} onChange={handleDealType} required>
                    <option value=""></option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                    <option value="industrial">Industrial</option>
                </select>
            </div>
            {renderDealType()}
            {renderStatusMessage()}

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

            <h3>Deal will be saved with user {userEmail} as main Agent</h3>

            <div className="form-row button-row">
                <button type="submit" className="App-button">Submit</button>
            </div>
            </form>

    );
};
export default AddDeal;