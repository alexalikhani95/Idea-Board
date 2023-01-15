import React, { useEffect, useReducer } from "react";
import "./App.css";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";
import IdeaProvider from "./context/IdeaContext";
import { IdeaType } from "./types/Idea";


type Action = 
  | {type: 'added'; idea: IdeaType}
  | {type: 'delete'; id: string;}
  | {type: 'update'; idea: IdeaType}


const ideasReducer = (ideas: IdeaType[], action: Action) => {
  switch (action.type) {
    case 'added': {
      return [...ideas, action.idea];
    }
    case 'update': {
      return ideas.map(idea => {
        if (idea.id === action.idea.id) {
          return action.idea;
        } else {
          return idea;
        }
      });
    }
    case 'delete': {
      return ideas.filter(idea => idea.id !== action.id);
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
      idea: idea
    });
  }

  function handleUpdateIdea(idea: IdeaType) {
    dispatch({
      type: 'update',
      idea: idea
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
          <Ideas deleteIdea={handleDeleteIdea} ideas={ideas} updateIdea={handleUpdateIdea}/>
        </div>
      </div>
    </IdeaProvider>
  );
}

export default App;
