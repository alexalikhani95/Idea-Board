import React, { useEffect, useReducer } from "react";
import "./App.css";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";
import IdeaProvider from "./context/IdeaContext";
import { IdeaType } from "./types/Idea";

const ideasReducer = (ideas: IdeaType[], action: any) => {
  switch (action.type) {
    case 'added': {
      return [...ideas, {
        id: action.id,
        title: action.title,
        description: action.description,
        createdAt: action.createdAt
      }];
    }
    case 'delete': {
      return ideas.filter(idea => idea.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const App = () => {
  const initialState = JSON.parse(localStorage.getItem("ideas") || "[]")
  const [ideas, dispatch] = useReducer(
    ideasReducer,
    initialState
  );

  const handleDeleteIdea = (ideaId: any) => {
    dispatch({
      type: 'delete',
      id: ideaId
    });
  }

  const handleAddIdea = (idea: IdeaType) => {
    dispatch({
      type: 'added',
      id: idea.id,
      title: idea.title,
      description: idea.description,
      createdAt: idea.createdAt
    });
  }

  useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas])

  return (
    <IdeaProvider>
      <div className="App">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <IdeaForm addIdea={handleAddIdea}/>
          <Ideas deleteIdea={handleDeleteIdea} ideas={ideas}/>
        </div>
      </div>
    </IdeaProvider>
  );
}

export default App;
