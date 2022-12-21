import React from "react";

const Ideas = () => {
  const ideas = JSON.parse(localStorage.getItem("ideas") || "[]");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {ideas.map((idea: any) => (
        <div style={{ width: 300, border: "1px solid black", margin: 20 }}>
          <h2>{idea.title}</h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Ideas;
