import { IdeaType } from '../types/Idea';

type Action =
  | { type: 'added'; idea: IdeaType }
  | { type: 'delete'; id: string }
  | { type: 'update'; idea: IdeaType }
  | { type: 'sort_alphabetical' }
  | { type: 'sort_created' };

const IdeasReducer = (ideas: IdeaType[], action: Action) => {
  switch (action.type) {
    case 'added': {
      return [...ideas, action.idea];
    }
    case 'update': {
      return ideas.map((idea) => {
        if (idea.id === action.idea.id) {
          return action.idea;
        } else {
          return idea;
        }
      });
    }
    case 'delete': {
      return ideas.filter((idea) => idea.id !== action.id);
    }
    case 'sort_alphabetical': {
      return [...ideas].sort((a: IdeaType, b: IdeaType) =>
        a.title.localeCompare(b.title)
      );
    }
    case 'sort_created': {
      return [...ideas].sort((a: IdeaType, b: IdeaType) =>
        a.createdAt.localeCompare(b.createdAt)
      );
    }
  }
};

export default IdeasReducer;
