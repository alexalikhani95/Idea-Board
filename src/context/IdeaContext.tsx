import React, { createContext, useEffect, useReducer } from 'react';
import IdeasReducer from '../reducers/ideasReducer';
import { IdeaType, IdeaContextType } from '../types/Idea';

type IdeaProviderProps = {
  children: React.ReactNode;
};

export const IdeaContext = createContext<IdeaContextType | null>(null);

const IdeaProvider = ({ children }: IdeaProviderProps) => {
  const initialState = JSON.parse(localStorage.getItem('ideas') || '[]');
  const [ideas, dispatch] = useReducer(IdeasReducer, initialState);

  const handleDeleteIdea = (ideaId: string) => {
    dispatch({
      type: 'delete',
      id: ideaId,
    });
  };

  const handleAddIdea = (idea: IdeaType) => {
    dispatch({
      type: 'added',
      idea: idea,
    });
  };

  const handleUpdateIdea = (idea: IdeaType) => {
    dispatch({
      type: 'update',
      idea: idea,
    });
  };

  const handleSortAlphabetical = () => {
    dispatch({
      type: 'sort_alphabetical',
    });
  };

  const handleSortCreated = () => {
    dispatch({
      type: 'sort_created',
    });
  };

  useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas]);

  return (
    <IdeaContext.Provider
      value={{
        ideas,
        handleDeleteIdea,
        handleAddIdea,
        handleUpdateIdea,
        handleSortAlphabetical,
        handleSortCreated,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
};

export default IdeaProvider;
