import { IdeaType } from "../types/Idea";
import { Action } from "../types/IdeaReducer";

const IdeasReducer = (ideas: IdeaType[], action: Action) => {
  switch (action.type) {
    case "added": {
      // check if theres a constant sortign
      // after adding then sort
      return [...ideas, action.idea];
    }
    case "update": {
      return ideas.map((idea) => {
        if (idea.id === action.idea.id) {
          return action.idea;
        } else {
          return idea;
        }
      });
    }
    case "delete": {
      return ideas.filter((idea) => idea.id !== action.id);
    }
    case "sort_alphabetical": {
      console.log({ beforeSorting: ideas });

      const sorted = [...ideas].sort((a, b) => a.title.localeCompare(b.title));

      console.log({ sorted });

      return sorted;
    }
  }
};

export default IdeasReducer;
