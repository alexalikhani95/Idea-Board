import { IdeaType } from "./Idea";

export type Action = 
  | {type: 'added'; idea: IdeaType}
  | {type: 'delete'; id: string;}
  | {type: 'update'; idea: IdeaType}
  | {type: 'sort_alphabetical'}
  | {type: 'sort_created'}