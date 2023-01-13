import React, { useReducer } from "react";
import "./App.css";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";
import IdeaProvider from "./context/IdeaContext";
import { IdeaType } from "./types/Idea";

function ideasReducer(ideas: IdeaType[], action: any) {
  switch (action.type) {
    case 'delete': {
      return ideas.filter(idea => idea.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function App() {
  const initialState = JSON.parse(localStorage.getItem("ideas") || "[]")
  const [ideas, dispatch] = useReducer(
    ideasReducer,
    initialState
  );

  function handleDeleteIdea(ideaId: any) {
    dispatch({
      type: 'delete',
      id: ideaId
    });
  }

  return (
    <IdeaProvider>
      <div className="App">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <IdeaForm />
          <Ideas deleteIdea={handleDeleteIdea} ideas={ideas}/>
        </div>
      </div>
    </IdeaProvider>
  );
}

export default App;
