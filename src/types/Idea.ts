export interface IdeaType {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface IdeaContextType {
  ideas: IdeaType[];
  setIdeas: React.Dispatch<React.SetStateAction<IdeaType[]>>;
}
