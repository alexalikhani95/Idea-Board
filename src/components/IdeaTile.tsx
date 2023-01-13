import React, { useContext, useEffect, useState, useRef } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaContextType, IdeaType } from "../types/Idea";
import "../styles/IdeaTile.css";

interface IdeaTileProps {
  idea: IdeaType;
  deleteIdea: any
}

const IdeaTile = ({ idea, deleteIdea }: IdeaTileProps) => {
  const { ideas, setIdeas } = useContext(IdeaContext) as IdeaContextType;
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [showUpdatedText, setShowUpdatedText] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(idea)
    deleteIdea(idea.id)
  };

  const handleUpdateTitle = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (updatedTitle === "") {
      return;
    }

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

    if (updatedDescription === "") {
      return;
    }

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

  const handleTitleClickOutside = (e: Event) => {
    if (!editingTitle) {
      return;
    }
    if (titleRef.current && !titleRef.current.contains(e.target as Node)) {
      handleUpdateTitle(e);
      setEditingTitle(false);
    }
  };

  const handleDescriptionClickOutside = (e: Event) => {
    if (!editingDescription) {
      return;
    }
    if (descriptionRef.current && !descriptionRef.current.contains(e.target as Node)) {
      handleUpdateDescription(e);
      setEditingDescription(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleTitleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleTitleClickOutside, true);
    };
  });

  useEffect(() => {
    document.addEventListener("click", handleDescriptionClickOutside, true);
    return () => {
      document.removeEventListener("click", handleDescriptionClickOutside, true);
    };
  });

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
          <h2
            style={{ display: !editingTitle ? "flex" : "none" }}
            onClick={() => setEditingTitle(true)}
          >
            {idea.title}
          </h2>
          <textarea
            style={{ display: editingTitle ? "flex" : "none" }}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            ref={titleRef}
            defaultValue={idea.title}
          />
        </div>

        <div className="idea-tile-section ">
          <p
            style={{ display: !editingDescription ? "flex" : "none" }}
            onClick={() => setEditingDescription(true)}
          >
            {idea.description}
          </p>
          <textarea
            style={{ display: editingDescription ? "flex" : "none" }}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            ref={descriptionRef}
            defaultValue={idea.description}
          />
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
