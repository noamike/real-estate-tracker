import {useSate, useState} from 'react';
import AddContactForm from './AddContactForm';
import ContactList from './ContactList';

const ContactComponent = () => {
    const [showAddContactForm, setShowAddContactForm] = useState(false);

    return (
        <>
            <button className='App-button' onClick = {() => setShowAddContactForm(!showAddContactForm)}>
                Add a Contact
            </button>
            {showAddContactForm && <AddContactForm />}
            <section className='App-content'>
                {/* Fetch Contacts */}
                {<ContactList/>}
            </section>
        </>
    )
}
export default ContactComponent;