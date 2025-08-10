import {doc, setDoc } from "firebase/firestore";
import {db} from "../firebase/FirebaseConfig";
import React, {useState} from 'react';
import useAuth from '../hooks/useAuth';

const AddDeal =() => {
    //set some basic variables for use later
    const {userID, identifier} = useAuth();
    if (identifier){
    let mainAgent = userID;
    };

    //1. Hold form data
    const [dealData, setDealData] = useState({
        dealName: '',
        dealLocation: '',
        mainAgent: {userID},
    });

    //2. Handle Input Changes
    const handleSubmit = () => {
        //creates each deal reference
        const newDealRef = doc(db, 'deals', 'my-deal-id');
        
        //creates the firebase document to hold the deal
        setDoc(newDealRef, {
            dealName: dealData.dealName,
            dealLocation: dealData.dealLocation,
            mainAgent: dealData.mainAgent,
            createdAt: new Date()
        });
        console.log('Document successfully written!');
        alert('Deal added Successfully');

        //Clear the form
        setDealData({
            dealName: '',
            dealLocation: '',
            mainAgent: ''
        });
    }
    return (
    <form onSubmit={handleSubmit}>
        <h2>Add a New Deal</h2>
        <input
            type="text"
            name="dealName"
            value={dealData.dealName}
            onChange={handleSubmit}
            placeholder="Deal Name"
        />
    </form>
    );
};
export default AddDeal;


