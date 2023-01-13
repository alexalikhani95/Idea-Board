import React, { useState } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaType, IdeaContextType } from "../types/Idea";
import IdeaTile from "./IdeaTile";
import "../styles/Ideas.css";

const Ideas = ({deleteIdea, ideas}: any) => {
  const {sort, setSort } = React.useContext(IdeaContext) as IdeaContextType;

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
      <button onClick={() => handleSort()} className="sort-button">
        {sort === "created" ? "Sort Ideas alphbetically" : "Sort ideas by creation date"}
      </button>
      <div className="idea-tiles-container">
        {sortedIdeas.map((idea: IdeaType) => (
          <IdeaTile idea={idea} key={idea.createdAt} deleteIdea={deleteIdea}/>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
