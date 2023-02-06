import { render } from '@testing-library/react';
import React from 'react';
import IdeaProvider, { IdeaContext } from '../../context/IdeaContext';
import { IdeaType } from '../../types/Idea';

const customRender = (ui: React.ReactElement, initialState: IdeaType[]) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
    <IdeaProvider>
    <IdeaContext.Provider value={{ ideas: initialState, handleDeleteIdea: jest.fn(), handleAddIdea: jest.fn(), handleUpdateIdea: jest.fn(), handleSortAlphabetical: jest.fn(), handleSortCreated: jest.fn() }}>
    {children}
    </IdeaContext.Provider>
    </IdeaProvider>
    );
    };
    
    return { ...render(ui, { wrapper: Wrapper }) };
    };
  
  export default customRender;