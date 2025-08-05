//app.js imports
import React, {useState,useEffect} from 'react';
import useAuth from './hooks/useAuth';
import './App.css'; // Import the CSS file for App.js

const App=()=>{
  const {userID}=useAuth();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Estate Deal Tracker</h1>
        <h3>Hello {userID}</h3>
      </header>
      <section className="App-content">
        <p>
          This is a basic design for your main application page.
          You can use this as a starting point to test your components as you build them out.
        </p>
        <button className="App-button">
          Get Started
        </button>
      </section>
      {/* You'll add other components here later */}
    </div>
  );
}

export default App;
