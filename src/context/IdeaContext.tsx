import React, { createContext, useEffect, useState } from "react";
import { IdeaType, IdeaContextType } from "../types/Idea";

export const IdeaContext = createContext<IdeaContextType | null>(null);

const IdeaProvider = ({ children }: any) => {
  const [ideas, setIdeas] = useState<IdeaType[]>([]);

  const addIdea = (idea: IdeaType) => {
    const newIdea: IdeaType = {
      id: new Date().toLocaleString(),
      title: idea.title,
      description: idea.description,
      createdAt: new Date().toLocaleString(),
    };
    setIdeas([...ideas, newIdea]);
  };

  useEffect(() => {
    const storedIdeas = JSON.parse(localStorage.getItem("ideas") || "[]");
    setIdeas(storedIdeas);
  }, []);

  return (
    <IdeaContext.Provider value={{ ideas, setIdeas, addIdea }}>{children}</IdeaContext.Provider>
  );
};

export default IdeaProvider;
