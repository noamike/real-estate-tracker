//app.js imports
import React, {useState,useEffect} from 'react';
import useAuth from './hooks/useAuth';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css'; // Import the CSS file for App.js
import SignInOptions from './components/SignInOptions';
import DealComponent from './components/DealComponent';
import ContactComponent from './components/contacts/ContactComponent';
import NavButtons from './components/NavButtons.js';
import MainComponent from './components/MainComponent.js';

const App=()=>{
  //Create variables and states to use later 
  const { userID, logout, userEmail } = useAuth();

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Estate Deal Tracker</h1>
        {!userID && <SignInOptions/>}
        {userID && 
          <div>
            <h2>Welcome, {userEmail} </h2>  
            <button className='form-button' onClick={logout}>Sign Out</button>
          </div>}
      </header>

      {!userID && <h1>Please sign in to manage your deals.</h1>}
  
      {userID && <MainComponent/>}

    </div>
  );
}

export default App;
