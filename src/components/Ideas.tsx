import React, { useState } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaType, IdeaContextType } from "../types/Idea";
import IdeaTile from "./IdeaTile";

const Ideas = () => {
  const { ideas, sort, setSort } = React.useContext(IdeaContext) as IdeaContextType;

  const sortIdeas = () => {
    if (sort === "alphabet") {
      return ideas.sort((a: IdeaType, b: IdeaType) => a.title.localeCompare(b.title));
    }
    if (sort === "created") {
      return ideas.sort((a: IdeaType, b: IdeaType) => a.createdAt.localeCompare(b.createdAt));
    }
  };

  const handleSort = () => {
    setSort(sort === "created" ? "alphabet" : "created");
    localStorage.setItem("sortValue", JSON.stringify(sort === "created" ? "alphabet" : "created"));
  };

  const sortedIdeas = sortIdeas();

  if (!sortedIdeas) {
    // To avoid the error ''sortedIdeas' is possibly 'undefined'when mapping sortedIdeas
    return <p>Loading...</p>;
  }

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={() => handleSort()}>
        {sort === "created" ? "Sort Ideas alphbetically" : "Sort ideas by creation date"}
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {sortedIdeas.map((idea: IdeaType) => (
          <IdeaTile idea={idea} key={idea.createdAt} />
        ))}
      </div>
    </div>
  );
};

export default Ideas;
