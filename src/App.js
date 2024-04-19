import React from 'react';
import Tournament from './components/Tournament';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tournament Simulator</h1>
      </header>
      <main>
        <Tournament />
      </main>
    </div>
  );
}

export default App;