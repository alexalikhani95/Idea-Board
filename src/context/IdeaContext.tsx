import React, { createContext, useEffect, useState } from "react";
import { IdeaType, IdeaContextType } from "../types/Idea";

export const IdeaContext = createContext<IdeaContextType | null>(null);

const IdeaProvider = ({ children }: any) => {
  const [ideas, setIdeas] = useState<IdeaType[]>([]);

  useEffect(() => {
    const storedIdeas = JSON.parse(localStorage.getItem("ideas") || "[]");
    setIdeas(storedIdeas);
  }, []);

  return <IdeaContext.Provider value={{ ideas, setIdeas }}>{children}</IdeaContext.Provider>;
};

export default IdeaProvider;
