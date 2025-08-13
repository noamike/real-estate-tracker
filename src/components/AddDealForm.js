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
    const [isPurchase, setIsPurchase] = useState(false);
    const [isSale, setIsSale] = useState(false);
    //1. Form Data tables
    const [dealData, setDealData] = useState({
        dealType:'',
        buildingName: '',
        buildingAddress: '',
        mainAgent: '',
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
                dealType: dealData.dealType,
                buildingName: dealData.buildingName,
                buildingAddress: dealData.buildingAddress,
                mainAgent: userID
            });
            console.log('Document Successfully Written');
            alert('Deal Added Successfully');

            //clear form
            setDealData({
                dealType:'',
                buildingName: '',
                buildingAddress: '',
                mainAgent: '',
            });
        } catch{
            console.log('Error adding document');
            alert('Failed to add deal');
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Add a New Deal</h2>
            <label for = "dealType">Choose Deal Type: </label>
            <select id="dealType" name="dealType" value={dealData.dealType} onChange={handleChange} required>
                <option value="none">-</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="industrial">Industrial</option>
            </select>
            <br/>
            <label for = "buildingName">Building Name: </label>
            <input
                type="text"
                name='buildingName'
                value={dealData.buildingName}
                onChange={handleChange}
                placeholder="Building Name"
                required
            />
            <br/>
            <label for = "buildingAddress">Building Address: </label>
            <input
                type="text"
                name='buildingAddress'
                value={dealData.buildingAddress}
                onChange={handleChange}
                placeholder="Property Address"
                required
            />
            <h3>Deal will be saved with user {userID} as main Agent</h3>
            <button type="submit">Submit</button>
        </form>
    );
};
export default AddDeal;