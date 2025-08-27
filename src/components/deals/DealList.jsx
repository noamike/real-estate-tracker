import useAuth from "../../hooks/useAuth";
import DealEditor from "./DealEditor";

const DealList = ({
	deals,
	error,
	fetched,
	selectedDeal,
	setSelectedDeal,
	setDeals,
}) => {
	const { userID } = useAuth();
	console.log("DealList userID: ", userID);

	const handleSelectDeal = (deal) => {
		setSelectedDeal(deal);
	};

	const handleSave = (updatedDeal) => {
		setDeals(
			deals.map((deal) => (deal.id === updatedDeal.id ? updatedDeal : deal))
		);
		setSelectedDeal(null);
	};

	const handleCancel = () => {
		setSelectedDeal(null);
	};

	const retrievedDeals = () => {
		if (deals.length > 0) {
			return (
				<form className="deal-form">
					<h2>Retrieved Deals:</h2>
					<div className="form-section" />
					{deals.map((deal) => (
						<div key={deal.id} className="form-row">
							<a
								href="#"
								onClick={(e) => {
									e.preventDefault();
									handleSelectDeal(deal);
								}}
							>
								<label>{deal.dealName}</label>
							</a>
						</div>
					))}
				</form>
			);
		} else {
			return <p>No deals found. Please add a deal.</p>;
		}
	};

	return (
		<>
			{error && <p style={{ color: "red" }}>{error}</p>}

			{/* Only show deals after fetch button is clicked */}
			{fetched && !selectedDeal && retrievedDeals()}

			{/* Show DealEditor when a deal is selected */}
			{selectedDeal && (
				<DealEditor
					deal={selectedDeal}
					onSave={handleSave}
					onCancel={handleCancel}
				/>
			)}
		</>
	);
};

export default DealList;
