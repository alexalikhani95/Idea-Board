import React, { useContext } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaContextType, IdeaType } from "../types/Idea";

interface IdeaTileProps {
  idea: IdeaType;
}

const IdeaTile = ({ idea }: IdeaTileProps) => {
  const { ideas, setIdeas } = useContext(IdeaContext) as IdeaContextType;

  const handleDelete = (e: any) => {
    e.preventDefault();
    const filteredIdeas = ideas.filter((i) => i.id !== idea.id);
    setIdeas(filteredIdeas);
    localStorage.setItem("ideas", JSON.stringify(filteredIdeas));
  };

  return (
    <div>
      <div style={{ width: 300, border: "1px solid black", margin: 20 }}>
        <h2>{idea.title}</h2>
        <p>{idea.description}</p>
        <p>Created at: {idea.createdAt}</p>
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      </div>
    </div>
  );
};

export default IdeaTile;
