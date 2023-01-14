import React, { useEffect, useState, useRef } from "react";
import { IdeaType } from "../types/Idea";
import "../styles/IdeaTile.css";

interface IdeaTileProps {
  idea: IdeaType;
  deleteIdea: any;
  updateIdea: any;
}

const IdeaTile = ({ idea, deleteIdea, updateIdea }: IdeaTileProps) => {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [showUpdatedText, setShowUpdatedText] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDelete = () => {
    deleteIdea(idea.id)
  };

  const handleTitleClickOutside = (e: Event) => {
    if (!editingTitle) {
      return;
    }
    if (titleRef.current && !titleRef.current.contains(e.target as Node)) {
      updateIdea({
        ...idea,
        title: updatedTitle
      })
      setEditingTitle(false);
    }
  };

  const handleDescriptionClickOutside = (e: Event) => {
    if (!editingDescription) {
      return;
    }
    if (descriptionRef.current && !descriptionRef.current.contains(e.target as Node)) {
      updateIdea({
        ...idea,
        description: updatedDescription
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
        <button className="delete-idea-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default IdeaTile;
