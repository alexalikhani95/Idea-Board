import React, {useContext } from "react";
import { IdeaType } from "../types/Idea";
import "../styles/IdeaTile.css";
import { IdeaContext } from "../context/IdeaContext";
import IdeaForm from "./IdeaForm";

type IdeaTileProps = {
  idea: IdeaType;
}

const IdeaTile = ({ idea}: IdeaTileProps) => {
    //@ts-expect-error
    const {handleDeleteIdea} = useContext(IdeaContext) as IdeaContextType;

  const handleDelete = () => {
    handleDeleteIdea(idea.id)
  };

  return (
    <div>
      <div className="idea-tile-container">
      <IdeaForm idea={idea} isAddForm={false}/>
        <p>Created at: {idea.createdAt}</p>
        {idea.updatedAt && <p>Updated at: {idea.updatedAt}</p>}
        <button className="delete-idea-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default IdeaTile;
