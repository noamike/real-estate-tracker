import {useSate, useState} from 'react';
import AddContactForm from './AddContactForm';

const ContactComponent = () => {
    const [showAddContactForm, setShowAddContactForm] = useState(false);

    return (
        <>
            <button className='App-button' onClick = {() => setShowAddContactForm(!showAddContactForm)}>
                Add a Contact
            </button>
            {showAddContactForm && <AddContactForm />}
        </>
    )
}
export default ContactComponent;