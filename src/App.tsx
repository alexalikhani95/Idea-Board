import React from "react";
import "./App.css";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      {/* <IdeaForm /> */}
      <IdeaForm />
      <Ideas />
    </div>
  );
}

export default App;
