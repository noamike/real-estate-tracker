//app.js imports
import React, {useState,useEffect} from 'react';
import useAuth from './hooks/useAuth';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css'; // Import the CSS file for App.js
import AddDealForm from "./components/AddDealForm";
import DealList from './components/DealList';
import EmailSignIn from './components/EmailSignIn';

const App=()=>{
  //Create variables and states to use later 
  const [showDealForm , setShowDealForm] = useState(false);
  const [showMyDeals, setShowMyDeals] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Estate Deal Tracker</h1>
        <EmailSignIn />
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
      <section className='App-content'>
        <button className='App-button' onClick ={()=>setShowMyDeals(!showMyDeals)}>
          View my Deals
        </button>
        {showMyDeals && <DealList/>}
      </section>
      {/* You'll add other components here later */}
    </div>
  );
}

export default App;
