import { render } from '@testing-library/react';
import React from 'react';

import { IdeaContext } from '../../context/IdeaContext';
import { IdeaContextType } from '../../types';

const Wrapper = ({
  children,
  customContext,
}: {
  children: React.ReactNode;
  customContext?: Partial<IdeaContextType>;
}) => {
  return (
    <IdeaContext.Provider
      value={{
        ideas: [],
        handleDeleteIdea: () => null,
        handleAddIdea: () => null,
        handleUpdateIdea: () => null,
        handleSortAlphabetical: () => null,
        handleSortCreated: () => null,
        ...customContext,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
};

const customRender = (
  ui: React.ReactElement,
  customContext?: Partial<IdeaContextType>
) => {
  return {
    ...render(ui, {
      wrapper: () => <Wrapper customContext={customContext}>{ui}</Wrapper>,
    }),
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
