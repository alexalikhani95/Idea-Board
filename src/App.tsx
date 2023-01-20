import { useEffect, useReducer } from "react";
import "./App.css";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";
import IdeaProvider from "./context/IdeaContext";
import IdeasReducer from "./reducers/ideasReducer";
import { IdeaType } from "./types/Idea";



const App = () => {



  return (
    <IdeaProvider>
      <div className="App">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <IdeaForm/>
          <Ideas />
        </div>
      </div>
    </IdeaProvider>
  );
}

export default App;
