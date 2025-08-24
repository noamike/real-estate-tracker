import {collection, addDoc} from 'firebase/firestore';
import {db} from '../../firebase/FirebaseConfig';
import React, {useState} from 'react';
import useAuth from '../../hooks/useAuth';

const AddContact = () => {
    const {userID} = useAuth();
    //1. Contact Data and values
    const [contactData, setContactData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        businessAddress: '',
        businessName: '',
        notes: '',
        contactID: ''
    });
    //2. Handle changes when typing in form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setContactData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    //3. Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newDealRef = collection(db, 'Contacts');
            await addDoc(newDealRef,{
                lastName: contactData.lastName,
                firstName: contactData.firstName,
                phone: contactData.phone,
                email: contactData.email,
                businessAddress: contactData.businessAddress,
                businessName: contactData.businessName,
                notes: contactData.notes
            });

            alert('Contact added successfully!');
        } catch (error) {
            console.error('Error adding contact: ', error);
            alert('Failed to add contact. Please try again.');
        }
        //Clear the form
        setContactData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            businessAddress: '',
            businessName: '',
            notes: ''
        })
    }
    return(
        <form onSubmit={handleSubmit} className='deal-form'>
            <h2>Add a New Contact</h2>
            <div className='form-row'>
                <label htmlFor='firstName'>First Name:</label>
                <input
                    type='text'
                    name='firstName'
                    value={contactData.firstName}
                    onChange={handleChange}
                    placeholder='First Name'
                    required
                />
            </div>
            <div className='form-row'>
                <label htmlFor='lastName'>Last Name:</label>
                <input
                    type='text'
                    name='lastName'
                    value={contactData.lastName}
                    onChange={handleChange}
                    placeholder='Last Name'
                    required
                />
            </div>
            <div className='form-row'>
                <label htmlFor='phone'>Phone Number:</label>
                <input
                    type='tel'
                    name='phone'
                    value={contactData.phone}
                    onChange={handleChange}
                    placeholder='123-456-7890'
                    required
                />
            </div>
            <div className='form-row'>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    name='email'
                    value={contactData.email}
                    onChange={handleChange}
                    placeholder='someone@somewhere.com'
                    required
                />
            </div>
            <div className='form-row'>
                <label htmlFor='businessAddress'>Business Address:</label>
                <input
                    type='text'
                    name='businessAddress'
                    value={contactData.businessAddress}
                    onChange={handleChange}
                    placeholder='Business Address'
                    required
                />
            </div>
            <div className='form-row'>
                <label htmlFor='businessName'>Business Name:</label>
                <input
                    type='text'
                    name='businessName'
                    value={contactData.businessName}
                    onChange={handleChange}
                    placeholder='Business Name'
                />
            </div>
            <div className='form-row'>
                <label htmlFor='notes'>Notes:</label>
                <textarea
                    name='notes'
                    value={contactData.notes}
                    onChange={handleChange}
                    placeholder='Notes'
                    required
                />
            </div>
            <div className='form-row button-row'>
                <button type='submit' className='form-button'>Submit</button>
            </div>
        </form>
    );
};
export default AddContact;
