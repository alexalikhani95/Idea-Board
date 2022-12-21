import { IdeaType } from "../types/Idea";

interface IdeaTileProps {
  idea: IdeaType;
}

const IdeaTile = ({ idea }: IdeaTileProps) => {
  return (
    <div>
      <div style={{ width: 300, border: "1px solid black", margin: 20 }}>
        <h2>{idea.title}</h2>
        <p>{idea.description}</p>
        <p>Created at: {idea.createdAt}</p>
      </div>
    </div>
  );
};
export default IdeaTile;
