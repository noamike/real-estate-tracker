//app.js imports
import React, {useState,useEffect} from 'react';
import useAuth from './hooks/useAuth';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css'; // Import the CSS file for App.js
import AddDealForm from "./components/AddDealForm";

const App=()=>{
  //Create variables and states to use later 
  const [showDealForm , setShowDealForm] = useState(false);
  const {userID, identifier} = useAuth();
  let welcomeMesage = 'Hello';
  if (identifier){
    welcomeMesage = <p>Welcome to the LDMC Real Estate Tracker. Sign in to save your work</p>
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Estate Deal Tracker</h1>
        <h3>{welcomeMesage}</h3>
        <h3>Your Identifier is {userID}</h3>
      </header>
      <section className="App-content">
        <p>
          This is a basic design for your main application page.
          You can use this as a starting point to test your components as you build them out.
        </p>
        <button className="App-button" onClick={()=>setShowDealForm(!showDealForm)}>
          Add a Deal
        </button>
        {showDealForm && <AddDealForm/>}
      </section>
      {/* You'll add other components here later */}
    </div>
  );
}

export default App;
