import React, { useEffect, useState, useRef, useContext } from "react";
import { IdeaType } from "../types/Idea";
import "../styles/IdeaTile.css";
import { IdeaContext } from "../context/IdeaContext";
import Form from "./Form";

type IdeaTileProps = {
  idea: IdeaType;
}

const IdeaTile = ({ idea}: IdeaTileProps) => {
    //@ts-expect-error
    const {handleDeleteIdea, handleUpdateIdea } = useContext(IdeaContext) as IdeaContextType;

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [showUpdatedText, setShowUpdatedText] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDelete = () => {
    handleDeleteIdea(idea.id)
  };

  const handleTitleClickOutside = (e: Event) => {
    if (!editingTitle) {
      return;
    }
    if (titleRef.current && !titleRef.current.contains(e.target as Node)) {
      handleUpdateIdea({
        ...idea,
        title: updatedTitle,
        updatedAt: new Date().toLocaleString(),
      })
      setEditingTitle(false);
    }
  };

  const handleDescriptionClickOutside = (e: Event) => {
    if (!editingDescription) {
      return;
    }
    if (descriptionRef.current && !descriptionRef.current.contains(e.target as Node)) {
      handleUpdateIdea({
        ...idea,
        description: updatedDescription,
        updatedAt: new Date().toLocaleString(),
      })
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
    <div>
      <div className="idea-tile-container">
        {showUpdatedText && <h3 style={{ color: "blue" }}>Idea updated!</h3>}
    <Form idea={idea} isAddForm={false}/>

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
