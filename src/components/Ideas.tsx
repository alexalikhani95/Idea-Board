import { useContext } from 'react';
import { IdeaContext } from '../context/IdeaContext';
import { IdeaType, IdeaContextType } from '../types/Idea';
import '../styles/Ideas.css';
import IdeaForm from './IdeaForm';

const Ideas = () => {
  const { ideas, handleSortAlphabetical, handleSortCreated } = useContext(IdeaContext) as IdeaContextType;

  if (!ideas.length) {
    return <p>No Ideas added yet...</p>;
  }

  return (
    <div className="ideas-container">
      {ideas.length > 1 && (
        <>
          <button onClick={handleSortAlphabetical} className="sort-button">
            Sort Ideas alphbetically
          </button>
          <button onClick={handleSortCreated} className="sort-button">
            Sort Ideas by creation date
          </button>
        </>
      )}
      <div className="ideas">
        {ideas.map((idea: IdeaType) => (
          <IdeaForm idea={idea} key={idea.id} />
        ))}
      </div>
    </div>
  );
};

export default Ideas;
