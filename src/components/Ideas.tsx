import React, { useContext} from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaType, IdeaContextType } from "../types/Idea";
import "../styles/Ideas.css";
import IdeaForm from "./IdeaForm";

const Ideas = () => {
    //@ts-ignore
    const { ideas, handleSortAlphabetical } = useContext(IdeaContext) as IdeaContextType;

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={handleSortAlphabetical} className="sort-button">
        Sort Ideas alphbetically
      </button>
      <div className="idea-tiles-container" style={{marginTop: '20px'}}>
        {ideas.map((idea: IdeaType) => (
          <IdeaForm idea={idea} key={idea.id}/>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
