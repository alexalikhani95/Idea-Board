import React, { useState } from "react";
import { IdeaType } from "../types/Idea";
import IdeaTile from "./IdeaTile";

const Ideas = () => {
  const ideas = JSON.parse(localStorage.getItem("ideas") || "[]");
  const [sortValue, setSortValue] = useState("created");

  const sortIdeas = (sort: string) => {
    if (sort === "alphabet") {
      return ideas.sort((a: IdeaType, b: IdeaType) => a.title.localeCompare(b.title));
    }
    if (sort === "created") {
      return ideas.sort((a: IdeaType, b: IdeaType) => a.createdAt.localeCompare(b.createdAt));
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={() => setSortValue(sortValue === "created" ? "alphabet" : "created")}>
        {sortValue === "created" ? "Sort Ideas alphbetically" : "Sort ideas by creation date"}
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {sortIdeas(sortValue).map((idea: IdeaType) => (
          <IdeaTile idea={idea} key={idea.createdAt} />
        ))}
      </div>
    </div>
  );
};

export default Ideas;
