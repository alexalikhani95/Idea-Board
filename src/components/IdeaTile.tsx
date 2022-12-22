import React, { useContext, useState } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaContextType, IdeaType } from "../types/Idea";

interface IdeaTileProps {
  idea: IdeaType;
}

const IdeaTile = ({ idea }: IdeaTileProps) => {
  const { ideas, setIdeas } = useContext(IdeaContext) as IdeaContextType;
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const filteredIdeas = ideas.filter((i) => i.id !== idea.id);
    setIdeas(filteredIdeas);
    localStorage.setItem("ideas", JSON.stringify(filteredIdeas));
  };

  const handleUpdateTitle = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //making a copy of the global state array of ideas
    let ideasList = [...ideas];

    // get index in ideas array of the selected idea
    const index = ideasList.map((i) => i.title).indexOf(idea.title);

    // making a copy of the selected idea
    let selectedIdea = { ...ideasList[index] };

    // updating the title of the selected idea
    selectedIdea.title = updatedTitle;

    // Adding the selected idea with updated title back to its place in the array
    ideasList[index] = selectedIdea;

    // Set the global ideas array to the new mutated array with the updated target idea
    setIdeas(ideasList);
    localStorage.setItem("ideas", JSON.stringify(ideasList));
  };

  return (
    <div>
      <div style={{ width: 300, border: "1px solid black", margin: 20 }}>
        <h2>{idea.title}</h2>{" "}
        <input type="text" onChange={(e) => setUpdatedTitle(e.target.value)} />
        <button onClick={(e) => handleUpdateTitle(e)}>Update title</button>
        <p>{idea.description}</p>
        <p>Created at: {idea.createdAt}</p>
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      </div>
    </div>
  );
};

export default IdeaTile;
