// import React, { useState } from 'react';
// import AddContactForm from './AddContactForm';
// import ContactList from './ContactList';
// import NavButtons from '../NavButtons';
// import AddDealForm from '../AddDealForm';
// import DealList from '../DealList';

// const ContactComponent = () => {
//     const [activeView, setActiveView] = useState(""); // "add", "fetch", "contact"

//     const handleShowAddDeal = () => setActiveView("add");
//     const handleFetchDeals = () => setActiveView("fetch");
//     const handleShowAddContact = () => setActiveView("contact");

//     return (
//         <>
//             <NavButtons
//                 showAddDeal={handleShowAddDeal}
//                 fetchDeals={handleFetchDeals}
//                 showAddContact={handleShowAddContact}
//             />
//             {activeView === "add" && <AddDealForm />}
//             {activeView === "fetch" && <DealList />}
//             {activeView === "contact" && <AddContactForm />}
//             <section className='App-content'>
//                 <ContactList/>
//             </section>
//         </>
//     );
// }
// export default ContactComponent;