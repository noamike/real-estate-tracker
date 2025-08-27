import React, { useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const ContactList = ({ showContacts }) => {
    const [allContacts, setAllContacts] = useState([]);
    const [displayedContacts, setDisplayedContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [contactsLoaded, setContactsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 25;

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        setSelectedContact(null);
        try {
            const q = query(collection(db, 'Contacts'));
            const querySnapshot = await getDocs(q);

            const contactData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const fullName = `${data.firstName} ${data.lastName}`;
                const phone = data.phone;
                const lastName = data.lastName || '';
                
                contactData.push({ id: doc.id, name: fullName, phone: phone, lastName: lastName });
            });
            
            // Sort contacts alphabetically by last name
            contactData.sort((a, b) => a.lastName.localeCompare(b.lastName));

            setAllContacts(contactData);
            setDisplayedContacts(contactData);
            setContactsLoaded(true);
        } catch (err) {
            console.error('Error fetching contacts: ', err);
            setError('Failed to fetch contacts. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    const handleFilterByLetter = (letter) => {
        setSelectedLetter(letter);
        setCurrentPage(1);
        const filteredList = allContacts.filter(contact => 
            contact.lastName.toUpperCase().startsWith(letter)
        );
        setDisplayedContacts(filteredList);
    };

    const handleShowAllContacts = () => {
        setSelectedLetter('');
        setCurrentPage(1);
        setDisplayedContacts(allContacts);
    };

    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = displayedContacts.slice(indexOfFirstContact, indexOfLastContact);
    const totalPages = Math.ceil(displayedContacts.length / contactsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderContactList = () => {
        if (loading) {
            return <p>Loading Contacts...</p>;
        }

        if (error) {
            return <p className='error-message'>{error}</p>;
        }

        if (allContacts.length === 0 && contactsLoaded) {
            return <p>No contacts available. Please add some contacts.</p>;
        }
        
        if (currentContacts.length === 0 && contactsLoaded && (selectedLetter || allContacts.length > 0)) {
            return <p>No contacts match this letter, choose another letter or add a contact.</p>;
        }

        return (
            <>
                {currentContacts.map((contact) => (
                    <div key={contact.id} className="contact-item">
                        <a href="#" onClick={(e) => { e.preventDefault(); handleSelectContact(contact); }}>
                            <label>{contact.name}</label>
                        </a>
                    </div>
                ))}
                
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button 
                            key={i + 1} 
                            onClick={() => paginate(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </>
        );
    };

    React.useEffect(() => {
        if (showContacts && !contactsLoaded) {
            fetchContacts();
        }
        if (!showContacts) {
            setContactsLoaded(false); // Reset loaded state if contacts view is hidden
        }
    }, [showContacts]);

    return (
        <>
            {contactsLoaded && (
                <form className="deal-form">
                    <h2>Contact List</h2>
                    <h3>
                        <p>            
                            <a href="#" onClick={e => { e.preventDefault(); handleShowAllContacts(); }}>Show All Contacts</a> 
                            <br/>
                            or
                            <br/>
                            Choose a letter to filter Contacts by Last Name
                        </p>
                    </h3>
                    <div className="alphabet-links">
                        {alphabet.map((letter) => (
                            <a
                                href="#"
                                key={letter}
                                onClick={e => { e.preventDefault(); handleFilterByLetter(letter); }}
                                className={selectedLetter === letter ? 'active' : ''}
                            >
                                {letter}
                            </a>
                        ))}
                    </div>
                    {selectedLetter && <p>Filtering by last name starting with: {selectedLetter}</p>}
                    
                    {renderContactList()}
                </form>
            )}

            {selectedContact && (
                <div className="selected-contact-details">
                    <h3>Selected Contact</h3>
                    <p><strong>Name:</strong> {selectedContact.name}</p>
                    <p><strong>Phone:</strong> {selectedContact.phone}</p>
                </div>
            )}
        </>
    );
};
export default ContactList;