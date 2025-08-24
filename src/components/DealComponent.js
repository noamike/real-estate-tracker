import AddDealForm from "./AddDealForm";
import DealList from './DealList';
import { useState } from "react";

const DealComponent = () => {
      const [showDealForm , setShowDealForm] = useState(false);

    return (
        <>
            <button className="App-button" onClick={() => setShowDealForm(!showDealForm)}>
              Add a Deal
            </button>
            {showDealForm && <AddDealForm />}
          <section className='App-content'>
            {/* Fetch Deals */}
            {<DealList/>}
          </section>
            {/*add more sections within this area but before the close tag of </>*/}
        </>
    );
};
export default DealComponent;