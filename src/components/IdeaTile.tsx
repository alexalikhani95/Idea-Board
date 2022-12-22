import React, { useContext, useState } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaContextType, IdeaType } from "../types/Idea";

interface IdeaTileProps {
  idea: IdeaType;
}

const IdeaTile = ({ idea }: IdeaTileProps) => {
  const { ideas, setIdeas } = useContext(IdeaContext) as IdeaContextType;
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);

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

    setEditingTitle(false);
  };

  const handleUpdateDescription = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //making a copy of the global state array of ideas
    let ideasList = [...ideas];

    // get index in ideas array of the selected idea
    const index = ideasList.map((i) => i.description).indexOf(idea.description);

    // making a copy of the selected idea
    let selectedIdea = { ...ideasList[index] };

    // updating the description of the selected idea
    selectedIdea.description = updatedDescription;

    // Adding the selected idea with updated title back to its place in the array
    ideasList[index] = selectedIdea;

    // Set the global ideas array to the new mutated array with the updated target idea
    setIdeas(ideasList);
    localStorage.setItem("ideas", JSON.stringify(ideasList));

    setEditingTitle(false);
  };

  return (
    <div>
      <div style={{ width: 300, border: "1px solid black", margin: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2>{idea.title}</h2>{" "}
          <button
            style={{ display: !editingTitle ? "block" : "none", width: 100 }}
            onClick={() => setEditingTitle(true)}
          >
            Edit title
          </button>
          <div style={{ display: editingTitle ? "flex" : "none" }}>
            <input type="text" onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={(e) => handleUpdateTitle(e)}>Update title</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p>{idea.description}</p>
          <button
            style={{ display: !editingDescription ? "block" : "none", width: 100 }}
            onClick={() => setEditingDescription(true)}
          >
            Edit Description
          </button>
          <div style={{ display: editingDescription ? "flex" : "none" }}>
            <input type="text" onChange={(e) => setUpdatedDescription(e.target.value)} />
            <button onClick={(e) => handleUpdateDescription(e)}>Update Description</button>
          </div>
        </div>

        <p>Created at: {idea.createdAt}</p>
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      </div>
    </div>
  );
};

export default IdeaTile;
