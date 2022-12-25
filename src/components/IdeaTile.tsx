import React, { useContext, useEffect, useState } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaContextType, IdeaType } from "../types/Idea";
import "../styles/IdeaTile.css";

interface IdeaTileProps {
  idea: IdeaType;
}

const IdeaTile = ({ idea }: IdeaTileProps) => {
  const { ideas, setIdeas } = useContext(IdeaContext) as IdeaContextType;
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [showUpdatedText, setShowUpdatedText] = useState(false);

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

    selectedIdea.updatedAt = new Date().toLocaleString();

    // Adding the selected idea with updated title back to its place in the array
    ideasList[index] = selectedIdea;

    // Set the global ideas array to the new mutated array with the updated target idea
    setIdeas(ideasList);
    localStorage.setItem("ideas", JSON.stringify(ideasList));

    setEditingTitle(false);
    setShowUpdatedText(true);
  };

  const handleUpdateDescription = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let ideasList = [...ideas];

    const index = ideasList.map((i) => i.description).indexOf(idea.description);

    let selectedIdea = { ...ideasList[index] };

    selectedIdea.description = updatedDescription;

    selectedIdea.updatedAt = new Date().toLocaleString();

    ideasList[index] = selectedIdea;

    setIdeas(ideasList);
    localStorage.setItem("ideas", JSON.stringify(ideasList));

    setEditingDescription(false);
    setShowUpdatedText(true);
  };

  useEffect(() => {
    setTimeout(function () {
      setShowUpdatedText(false);
    }, 3000);
  }, [showUpdatedText]);

  return (
    <div data-testid="idea-tile">
      <div className="idea-tile-container">
        {showUpdatedText && <h3 style={{ color: "blue" }}>Idea updated!</h3>}
        <div className="idea-tile-section ">
          <h2>{idea.title}</h2>{" "}
          <button
            className="idea-tile-button"
            style={{ display: !editingTitle ? "block" : "none" }}
            onClick={() => setEditingTitle(true)}
          >
            Edit title
          </button>
          <div style={{ display: editingTitle ? "flex" : "none" }}>
            <input type="text" onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={(e) => handleUpdateTitle(e)}>Update title</button>
          </div>
        </div>

        <div className="idea-tile-section ">
          <p>{idea.description}</p>
          <button
            className="idea-tile-button"
            style={{ display: !editingDescription ? "block" : "none" }}
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
        {idea.updatedAt && <p>Updated at: {idea.updatedAt}</p>}
        <button className="delete-idea-button" onClick={(e) => handleDelete(e)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default IdeaTile;
