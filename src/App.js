//app.js imports
import React, {useState,useEffect} from 'react';
import { FirebaseProvider,useFirebase } from './FirebaseConfig';
//adding more imports as needed

//app components 
const App = () => {
  //logic to be added later
  const{userID,isAuthReady}=useFirebase();
  //console.log("App Component Render - userId:", userId, "isAuthReady:", isAuthReady);

  useEffect(()=>{
    //add in html and css components later
  },[]);

 if (!isAuthReady) {
    // This is where you'll see "Initializing application..."
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-700">Initializing application...</div>
      </div>
    );
  }

//function App() {
  return (
 <div className="min-h-screen w-full flex flex-col items-center p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">Real Estate Deal Tracker</h1>
        <p className="text-center text-gray-600 mb-4">
          Your User ID: <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded-md">{userId}</span>
        </p>
        <p className="text-center text-gray-600 text-sm">
          Share your User ID with other agents if you want them to see your updates.
        </p>
      </div>
      {/* Content will go here */}
    </div>
  );
}

export default function RealEstateTrackerWrapper(){
  return(
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  );
};
