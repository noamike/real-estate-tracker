import React, { useState } from "react";
import DealList from "./deals/DealList";
import AddDealForm from "./deals/AddDealForm";
import AddContactForm from "../components/contacts/AddContactForm";
import ContactList from "./contacts/ContactList";
import NavButtons from "./NavButtons";
import { collection, query, where, getDocs } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase/FirebaseConfig";

const MainComponent = () => {
	const [activeView, setActiveView] = useState(""); // "addDeal", "dealList", "addContact", "contactList"
	const [deals, setDeals] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [error, setError] = useState(null);
	const [selectedDeal, setSelectedDeal] = useState(null);
	const [showContacts, setShowContacts] = useState(false);
	const { userID } = useAuth();

	const fetchDeals = async () => {
		setLoading(true);
		setError(null);
		setSelectedDeal(null);
		try {
			const q = query(
				collection(db, "Deals"),
				where("mainAgent", "==", userID)
			);
			const querySnapshot = await getDocs(q);
			const dealData = [];
			querySnapshot.forEach((doc) => {
				console.log("Deal doc data:", doc.data());
				dealData.push({ id: doc.id, ...doc.data() });
			});
			setDeals(dealData);
			setFetched(true);
			setActiveView("dealList");
			console.log("Fetched deals:", dealData);
		} catch (err) {
			setError("Failed to fetch deals.");
		} finally {
			setLoading(false);
		}
	};

	const handleShowAddDeal = () => {
		setActiveView("addDeal");
		setShowContacts(false);
	};
	//   const handleShowDealList = () => {
	//     setActiveView("dealList");
	//     setShowContacts(false);
	//   };
	const handleShowAddContact = () => {
		setActiveView("addContact");
		setShowContacts(false);
	};
	const handleShowContactList = () => {
		setActiveView("contactList");
		setShowContacts(true);
	};

	return (
		<section className="App-content">
			<NavButtons
				showAddDeal={handleShowAddDeal}
				fetchDeals={fetchDeals}
				loading={loading}
				showAddContact={handleShowAddContact}
				showContactList={handleShowContactList}
				showContacts={showContacts}
			/>
			{activeView === "addDeal" && <AddDealForm />}
			{activeView === "dealList" && (
				<DealList
					deals={deals}
					loading={loading}
					error={error}
					fetched={fetched}
					selectedDeal={selectedDeal}
					setSelectedDeal={setSelectedDeal}
					setDeals={setDeals}
					handleSaveDeal={(updatedDeal) => {
						setDeals(
							deals.map((deal) =>
								deal.id === updatedDeal.id ? updatedDeal : deal
							)
						);
						setSelectedDeal(null);
					}}
					handleCancelEdit={() => setSelectedDeal(null)}
				/>
			)}
			{activeView === "addContact" && <AddContactForm />}
			{activeView === "contactList" && (
				<ContactList showContacts={showContacts} />
			)}
		</section>
	);
};

export default MainComponent;
