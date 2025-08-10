import {collection, query, where, getDocs} from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase/FirebaseConfig";
import React, {useState} from "react";

const DealList = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {userID} = useAuth();


    const fetchDeals = async () => {
        //App now knows that data is being fetched and there are no errors 
        setLoading(true);
        setError(null);

        try{
            console.log('Attempting to Query Database');
            //find all documents in the "Deals collection where the main agent is the currently authenticated user"
            const q = query(collection(db, 'Deals'), where("mainAgent", "==", userID));
            const querySnapshot = await getDocs(q);

            //fill an array of deals to pull data from
            const dealData = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                let prpoertyName = doc.data().dealName;
                let propertyAddress = doc.data().dealAddress;
                console.log('prpoertyName:', prpoertyName);
                //Consolidate data into an array piece for later 
                dealData.push({id: doc.id, name: prpoertyName, Address:propertyAddress});
            });
            setDeals(dealData);
        } catch (err) {
            console.error("Error fetching deals: ", err);
            setError("Failed to fetch deals.");
        } finally {
            setLoading(false);
        }
    };
    return(
        <div>
            <button onClick={fetchDeals} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Deals'}
            </button>
            {error && <p style = {{color: 'red'}}>{error}</p>}
            <ul>
                {deals.map((deals) => (
                    <li key={deals.id}>
                        {deals.name} - {deals.Address}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default DealList;