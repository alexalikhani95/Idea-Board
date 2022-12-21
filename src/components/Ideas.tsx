import React, { useState } from "react";

const Ideas = () => {
  const ideas = JSON.parse(localStorage.getItem("ideas") || "[]");
  const [sortValue, setSortValue] = useState("created");

  const sortIdeas = (sort: string) => {
    if (sort === "alphabet") {
      return ideas.sort((a: any, b: any) => a.title.localeCompare(b.title));
    }
    if (sort === "created") {
      return ideas.sort((a: any, b: any) => a.createdAt.localeCompare(b.createdAt));
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={() => setSortValue(sortValue === "created" ? "alphabet" : "created")}>
        {sortValue === "created" ? "Sort Ideas alphbetically" : "Sort ideas by creation date"}
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {sortIdeas(sortValue).map((idea: any) => (
          <div style={{ width: 300, border: "1px solid black", margin: 20 }}>
            <h2>{idea.title}</h2>
            <p>{idea.description}</p>
            <p>Created at: {idea.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
