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

            await addDoc(newDealRef, {
                leaseOrSale: dealData.leaseOrSale,
                dealType: dealData.dealType,
                dealName: dealData.dealName,
                buildingAddress: dealData.buildingAddress,
                mainAgent: userID
                
            });
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
    return(
        <form onSubmit={handleSubmit}>
            <h2>Add a New Deal</h2>

             <div>
                Deal Type:  <nbsp/>
                <select id="dealType" name="dealType" value={dealData.dealType} onChange={handleChange} required>
                    <option value="none">-</option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                    <option value="industrial">Industrial</option>
                </select>
            </div>

            <div>Choose Lease or Sale: <nbsp/>
                {/* <select id="leaseOrSale" name="leaseOrSale" value={dealData.leaseOrSale} onChange={handleChange} required>
                    <option value="lease">Lease</option>
                    <option value="sale">Sale</option>
                </select> */}
                <input type="radio" id="leaseOrSale" value="lease" name="leaseOrSale" onChange={handleChange}/>
                <label for="lease">Lease</label>
                <input type="radio" id="leaseOrSale" value="sale" name="leaseOrSale" onChange={handleChange}/>
                <label for="sale">Sale</label>
            </div>

           
            <div>
                Building Name: <nbsp/>
                <input
                    type="text"
                    name='dealName'
                    value={dealData.dealName}
                    onChange={handleChange}
                    placeholder="Building Name"
                    required
                />
            </div>
            <div>
                Building Address: <nbsp/>
                <input
                    type="text"
                    name='buildingAddress'
                    value={dealData.buildingAddress}
                    onChange={handleChange}
                    placeholder="Property Address"
                    required
                />
            </div>
            

            {/* Lease-specific fields */}
            {dealData.leaseOrSale === 'lease' && (
            <div>
                <h4>Lease Details</h4>
                <div>Lease Term & Rate: <nbsp/>
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
                <div>Lease Start and End Date: <nbsp/>
                <input
                    type="date"
                    name="leaseDate"
                    value={dealData.leaseDate}
                    onChange={handleChange}
                    placeholder="Lease Start Date"
                />
                <input
                    type="date"
                    name="leaseExpiration"
                    value={dealData.leaseExpiration}
                    onChange={handleChange}
                    placeholder="Lease Expiration"
                />
                </div>
                <div>Additional Charges: <nbsp/>
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
        {dealData.leaseOrSale === 'sale' && (
            <div>
                <h4>Sale Details</h4>
                <input
                    type="text"
                    name="sellerName"
                    value={dealData.sellerName}
                    onChange={handleChange}
                    placeholder="Seller Name"
                />
                <input
                    type="date"
                    name="saleDate"
                    value={dealData.saleDate}
                    onChange={handleChange}
                    placeholder="Sale Date"
                />
                <input
                    type="number"
                    name="salePrice"
                    value={dealData.salePrice}
                    onChange={handleChange}
                    placeholder="Sale Price"
                />
                <input
                    type="number"
                    name="ppsq"
                    value={dealData.ppsq}
                    onChange={handleChange}
                    placeholder="Price Per Sq Ft"
                />
            </div>
        )}
            <h3>Deal will be saved with user {userID} as main Agent</h3>
            <button type="submit">Submit</button>
        </form>
    );
};
export default AddDeal;