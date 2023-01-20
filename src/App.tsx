import { useEffect, useReducer } from "react";
import "./App.css";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";
import IdeaProvider from "./context/IdeaContext";
import IdeasReducer from "./reducers/ideasReducer";
import { IdeaType } from "./types/Idea";


const App = () => {
  const initialState = JSON.parse(localStorage.getItem("ideas") || "[]")
  const [ideas, dispatch] = useReducer(
    IdeasReducer,
    initialState
  );

  const handleDeleteIdea = (ideaId: string) => {
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

  const handleUpdateIdea = (idea: IdeaType) => {
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
