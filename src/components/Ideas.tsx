import React, { useState } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaType, IdeaContextType } from "../types/Idea";
import IdeaTile from "./IdeaTile";

const Ideas = () => {
  const [sortValue, setSortValue] = useState("created");
  const { ideas } = React.useContext(IdeaContext) as IdeaContextType;

  const sortIdeas = (sort: string) => {
    if (sort === "alphabet") {
      return ideas.sort((a: IdeaType, b: IdeaType) => a.title.localeCompare(b.title));
    }
    if (sort === "created") {
      return ideas.sort((a: IdeaType, b: IdeaType) => a.createdAt.localeCompare(b.createdAt));
    }
  };

  const sortedIdeas = sortIdeas(sortValue);

  if (!sortedIdeas) {
    // To avoid the error ''sortedIdeas' is possibly 'undefined'when mapping sortedIdeas
    return <p>Loading...</p>;
  }

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={() => setSortValue(sortValue === "created" ? "alphabet" : "created")}>
        {sortValue === "created" ? "Sort Ideas alphbetically" : "Sort ideas by creation date"}
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
