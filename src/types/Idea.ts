export interface IdeaType {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IdeaContextType {
  ideas: IdeaType[];
  setIdeas: React.Dispatch<React.SetStateAction<IdeaType[]>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}
