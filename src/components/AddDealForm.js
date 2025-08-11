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
    //1. Form Data tables
    const [dealData, setDealData] = useState({
        dealName: '',
        dealAddress: '',
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
                dealName: dealData.dealName,
                dealAddress: dealData.dealAddress,
                mainAgent: userID
            });
            console.log('Document Successfully Written');
            alert('Deal Added Successfully');

            //clear form
            setDealData({
                dealName: '',
                dealAddress: '',
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
            <input
                type="text"
                name='dealName'
                value={dealData.dealName}
                onChange={handleChange}
                placeholder="Deal Name"
                required
            />
            <input
                type="text"
                name='dealAddress'
                value={dealData.dealAddress}
                onChange={handleChange}
                placeholder="Property Address"
                required
            />
            <h3>Deal will be saved with user {userID} as main Agent</h3>
            <button type="submit">Add Deal</button>
        </form>
    );
};
export default AddDeal;