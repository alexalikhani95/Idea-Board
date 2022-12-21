import React from "react";
import "./App.css";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <IdeaForm />
        <Ideas />
      </div>
    </div>
  );
}

export default App;
