import React, { useState } from "react";

const IdeaForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const ideas = JSON.parse(localStorage.getItem("ideas") || "[]");

    const idea = {
      title: title,
      description: description,
    };

    ideas.push(idea);

    localStorage.setItem("ideas", JSON.stringify(ideas));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", border: "1px solid grey", width: 200 }}>
      <h2>Add an idea</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Title</label>
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IdeaForm;
