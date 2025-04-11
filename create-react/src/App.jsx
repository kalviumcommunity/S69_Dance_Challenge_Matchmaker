import React from "react";
import "./App.css";
import EntityCard from "./components/EntityCard"; // Importing the component

function App() {
  const entityData = {
    name: "Hip-Hop Battle",
    description: "Find the best hip-hop dancers and challenge them to a dance-off!",
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>Dance Challenge Matchmaker</h1>
        <p>Dance, Joy, Trends</p>
        <button>View Trends !!</button>
      </header>

      {/* Rendering the EntityCard component with dummy data */}
      <section className="entity-section">
        <EntityCard name={entityData.name} description={entityData.description} />
      </section>
    </div>
  );
}

export default App;
