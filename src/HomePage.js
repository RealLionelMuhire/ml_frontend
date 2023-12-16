// src/components/HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomePage.css'; // Import your custom CSS for styling

function HomePage() {
  // Use state to track user's choice (default is "None")
  const [userChoice, setUserChoice] = useState('None');

  return (
    <div className="home-page">
      <main>
        <div className="my_container">
          {/* Conditional rendering based on user's choice */}
          {userChoice === 'None' && (
            <div className="account-header">
              <h2>Welcome to ML Corporate Services</h2>
              <p>Do you have an account?</p>
              <div className="account-buttons">
                {/* Button for "Yes" */}
                <button className="btn btn-primary" onClick={() => setUserChoice('Yes')}>
                  Yes
                </button>
                {/* Button for "No" */}
                <button className="btn btn-secondary" onClick={() => setUserChoice('No')}>
                  No
                </button>
              </div>
            </div>
          )}

          {userChoice === 'No' && (
            // Displayed when the user does not have an account
            <div className="client-registration">
              <h2>Welcome to ML CORPORATE SERVICES</h2>
              {/* Link to the ClientRegistrationPage component */}
              <div class="button-to-account">
              <Link to="/client-registration">
                <button className="btn btn-secondary">Create a new account</button>
              </Link>
              </div>
            </div>
          )}

          {userChoice === 'Yes' && (
            // Displayed when the user has an account
            <div className="client-registration">
              <h2>Welcome to Back ML CORPORATE SERVICES</h2>
              {/* Link to the ClientRegistrationPage component */}
              <div class="button-to-account">
              <Link to="/client-login">
                <button className="btn btn-secondary">Login</button>
              </Link>
              </div>
            </div>
          )}

          {/* Link to login as administrator */}
          <div className="admin-login-link">
            <Link to="/admin-login">Login as Administrator</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
