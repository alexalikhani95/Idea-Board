import React, { createContext, useState } from "react";
import { IdeaType, IdeaContextType } from "../types/Idea";

type IdeaProviderProps = {
  children: React.ReactNode
}

export const IdeaContext = createContext<IdeaContextType | null>(null);

const IdeaProvider = ({ children }: IdeaProviderProps) => {
  const [ideas, setIdeas] = useState<IdeaType[]>([]);
  const [sort, setSort] = useState("created");


  return (
    <IdeaContext.Provider value={{ ideas, setIdeas, sort, setSort }}>
      {children}
    </IdeaContext.Provider>
  );
};

export default IdeaProvider;
