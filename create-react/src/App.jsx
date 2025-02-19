import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="hero">
        <img src='dance-removebg-preview.png' alt='Dancer' className='dancer'></img>
        <img src="dance-removebg-preview.png" alt="Dancer" className="dance-bg left" />
        <img src="dance-removebg-preview.png" alt="Dancer" className="dance-bg right" />


        <h1>Dance Challenge Matchmaker</h1>
        <p>Dance, Love, Trends, Joy</p>
        <button>💃 Start Your Dance Journey 💃</button>

      </header>
    </div>
  );
}

export default App;