//app.js imports
import React, {useState,useEffect} from 'react';
import useAuth from './hooks/useAuth';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css'; // Import the CSS file for App.js
import AddDealForm from "./components/AddDealForm";
import DealList from './components/DealList';
import SignInOptions from './components/SignInOptions';

const App=()=>{
  //Create variables and states to use later 
  const [showDealForm , setShowDealForm] = useState(false);
  const [showMyDeals, setShowMyDeals] = useState(false);
  const { userID, logout, userEmail } = useAuth();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Estate Deal Tracker</h1>
        {!userID && <SignInOptions/>}
        {userID && 
          <div>
            <h2>Welcome, {userEmail} </h2>  
            <button className='App-button' onClick={logout}>Sign Out</button>
          </div>}
      </header>
      {!userID && <h1>Please sign in to manage your deals.</h1>}
      {userID &&
      <>
        <section className="App-content">
            <p>
              This is a basic design for your main application page.
              You can use this as a starting point to test your components as you build them out.
            </p>
            <button className="App-button" onClick={() => setShowDealForm(!showDealForm)}>
              Add a Deal
            </button>
            {showDealForm && <AddDealForm />}
          </section><section className='App-content'>
              <button className='App-button' onClick={() => setShowMyDeals(!showMyDeals)}>
                View my Deals
              </button>
              {showMyDeals && <DealList />}
            </section>
            {/*add more sections within this area but before the close tag of </>*/}
        </>}
    </div>
  );
}

export default App;
