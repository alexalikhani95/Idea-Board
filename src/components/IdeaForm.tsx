import React, { useState, useRef, useEffect, useContext } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaContextType } from "../types/Idea";
import "../styles/IdeaForm.css";

const IdeaForm = () => {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blankField, setBlankField] = useState(false);

  const { setIdeas } = useContext(IdeaContext) as IdeaContextType;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return setBlankField(true);
    }
    const ideas = JSON.parse(localStorage.getItem("ideas") || "[]");

    const idea = {
      id: new Date().toLocaleString(),
      title: title,
      description: description,
      createdAt: new Date().toLocaleString(),
    };

    setIdeas([...ideas, idea]);

    ideas.push(idea);

    localStorage.setItem("ideas", JSON.stringify(ideas));

    if (blankField) {
      setBlankField(false);
    }
  };

  useEffect(() => {
    // If statement to check that the ref is not null to satisfy typescript
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  return (
    <div className="add-idea-card" data-testid="idea-form">
      <h2>Add an idea</h2>
      {blankField && (
        <p style={{ color: "red" }}>Please fill in both title and description fields</p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Title</label>
          <input
            type="text"
            name="title"
            ref={titleInputRef}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: "10px" }}>Description</label>
          <input
            type="text"
            name="description"
            maxLength={140}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <p>Description Characters remaining: {140 - description.length} / 140</p>
        <button type="submit" className="add-idea-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
