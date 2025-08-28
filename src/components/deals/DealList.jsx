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
						<div key={deal.id} className="flex">
							<a
								href="#"
								className="m-auto p-2 pl-4 pr-4 rounded-lg transition-all duration-300 border-1 border-white hover:shadow-lg hover:border-black"
								onClick={(e) => {
									e.preventDefault();
									handleSelectDeal(deal);
								}}
							>
								<label>{deal.dealName}</label>
							</a>
							<button
								className="p-2 rounded bg-red-400 transition-all duration-300 border-1 border-white hover:shadow-lg hover:border-black"
								type="button"
								onClick={(e) => {
									alert("this doesn't work yet");
								}}
							>
								✗
							</button>
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
