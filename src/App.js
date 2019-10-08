import React from 'react';

function App() {
  return (
    <div className="app">
      <div className="exchanging-form-container">
        <div className="exchanging-form-box">
          <h2>EUR</h2>
          <p>You have 25.00 EUR</p>
        </div>
        <div className="exchanging-form-box">
          <h2>GBP</h2>
          <p>You have 13.00 GBP</p>
        </div>

        <div className="submit-button-container">
          <button className="submit-button">Exchange</button>
        </div>
      </div>
    </div>
  );
}

export default App;
