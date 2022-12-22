import React, { createContext, useEffect, useState } from "react";
import { IdeaType, IdeaContextType } from "../types/Idea";

export const IdeaContext = createContext<IdeaContextType | null>(null);

const IdeaProvider = ({ children }: any) => {
  const [ideas, setIdeas] = useState<IdeaType[]>([]);
  const [sort, setSort] = useState("created");

  useEffect(() => {
    try {
      const storedIdeas = JSON.parse(localStorage.getItem("ideas") || "[]");
      setIdeas(storedIdeas);
      const storedSortValue = JSON.parse(localStorage.getItem("sortValue") || "");
      setSort(storedSortValue);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <IdeaContext.Provider value={{ ideas, setIdeas, sort, setSort }}>
      {children}
    </IdeaContext.Provider>
  );
};

export default IdeaProvider;
