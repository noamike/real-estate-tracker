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
                Choose Lease or Sale: 
                <select id="leaseOrSale" name="leaseOrSale" value={dealData.leaseOrSale} onChange={handleChange} required>
                    <option value="lease">Lease</option>
                    <option value="sale">Sale</option>
                </select>
            </div>
            <div>
                Deal Type: 
                <select id="dealType" name="dealType" value={dealData.dealType} onChange={handleChange} required>
                    <option value="none">-</option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                    <option value="industrial">Industrial</option>
                </select>
            </div>
            <div>
                Building Name: 
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
                Building Address:
                <input
                    type="text"
                    name='buildingAddress'
                    value={dealData.buildingAddress}
                    onChange={handleChange}
                    placeholder="Property Address"
                    required
                />
            </div>
            <h3>Deal will be saved with user {userID} as main Agent</h3>
            <button type="submit">Submit</button>
        </form>
    );
};
export default AddDeal;