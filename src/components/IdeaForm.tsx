import React, { useState, useRef, useEffect, useContext } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaContextType } from "../types/Idea";

const IdeaForm = () => {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { addIdea } = useContext(IdeaContext) as IdeaContextType;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const ideas = JSON.parse(localStorage.getItem("ideas") || "[]");

    const idea = {
      id: new Date().toLocaleString(),
      title: title,
      description: description,
      createdAt: new Date().toLocaleString(),
    };

    addIdea(idea);

    ideas.push(idea);

    localStorage.setItem("ideas", JSON.stringify(ideas));
  };

  useEffect(() => {
    // If statement to check that the ref is not null to satisfy typescript
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", border: "1px solid grey", width: 200 }}>
      <h2>Add an idea</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            ref={titleInputRef}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            maxLength={140}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <p>Description Characters remaining: {140 - description.length} / 140</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IdeaForm;
