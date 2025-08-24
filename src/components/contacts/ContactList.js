import React from "react";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null); // New state to track selected contact
    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        setSelectedContact(null); // Clear selected contact when fetching
        try {
            console.log('Attempting to Query Database');
            // Query to find all contacts in the Contacts collection
            const q = query(collection(db, 'Contacts'));
            const querySnapshot = await getDocs(q);

            // Process the fetched documents
            const contactData = [];
            querySnapshot.forEach((doc) => {
                let fullName = doc.data().firstName + " " + doc.data().lastName;
                let phone = doc.data().phone;
                console.log("Contact name is: ", fullName);
                contactData.push({ id: doc.id, name: fullName, phone: phone });
            });
            setContacts(contactData);
        } catch (err) {
            console.error('Error fetching contacts: ', err);
            setError('Failed to fetch contacts. Please try again.');
        }finally{
            setLoading(false);
        }
    };
    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    const retrievedContacts= () => {
        if (contacts.length > 0) {
            return (
                <>
                    <form className="deal-form">
                        <h2>Contact List</h2>
                        <div className="form-section"/>
                        {contacts.map((contact) => (
                            <div key={contact.id} className="form-row">
                                <a href="#" onClick={(e) => { e.preventDefault(); handleSelectContact(contact); }}>
                                    <label>{contact.name}</label>
                                </a>
                            </div>
                        ))}
                    </form>
                </>
            );
        }
    };
    return (
        <>
            <button className='App-button' onClick={fetchContacts} disabled={loading}>
                {loading ? 'Loading Contacts...' : 'Fetch Contacts'}
            </button>
            {retrievedContacts()}
            {error && <p className='error-message'>{error}</p>}
            
            {/* Render contacts here */}
        </>
    );
};
export default ContactList;