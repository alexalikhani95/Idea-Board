import React, { createContext, useEffect, useReducer, useState } from "react";
import IdeasReducer from "../reducers/ideasReducer";
import { IdeaType, IdeaContextType } from "../types/Idea";

type IdeaProviderProps = {
  children: React.ReactNode
}

export const IdeaContext = createContext<IdeaContextType | null>(null);

const IdeaProvider = ({ children }: IdeaProviderProps) => {
  const initialState = JSON.parse(localStorage.getItem("ideas") || "[]")
  const [ideas, dispatch] = useReducer(
    IdeasReducer,
    initialState
  );
  const [sort, setSort] = useState("created");

  const handleDeleteIdea = (ideaId: string) => {
    dispatch({
      type: 'delete',
      id: ideaId
    });
  }

  const handleAddIdea = (idea: IdeaType) => {
    dispatch({
      type: 'added',
      idea: idea
    });
  }

  const handleUpdateIdea = (idea: IdeaType) => {
    dispatch({
      type: 'update',
      idea: idea
    });
  }

  useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas])


  return (
    <IdeaContext.Provider value={{ ideas, sort, setSort, handleDeleteIdea, handleAddIdea, handleUpdateIdea }}>
      {children}
    </IdeaContext.Provider>
  );
};

export default IdeaProvider;
