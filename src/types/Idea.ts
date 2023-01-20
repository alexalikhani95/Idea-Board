export type IdeaType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

export type IdeaContextType = {
  ideas: IdeaType[];
  handleDeleteIdea:(ideaId: string) => void
  handleAddIdea: (idea: IdeaType) => void
  handleUpdateIdea: (idea: IdeaType) => void
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}
