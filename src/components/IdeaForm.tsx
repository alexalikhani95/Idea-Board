import { useState, useRef, useEffect, useContext } from "react";
import { IdeaContext } from "../context/IdeaContext";
import { IdeaContextType } from "../types/Idea";
import "../styles/IdeaForm.css";
import { useForm } from "react-hook-form";

type Inputs = {
  title: string,
  description: string,
};

const IdeaForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const [description, setDescription] = useState("");

  const { setIdeas } = useContext(IdeaContext) as IdeaContextType;

  const submitForm = (data: Inputs) => {

    const ideas = JSON.parse(localStorage.getItem("ideas") || "[]");

    const idea = {
      id: new Date().toLocaleString(),
      title: data.title,
      description: data.description,
      createdAt: new Date().toLocaleString(),
    };

    setIdeas([...ideas, idea]);

    ideas.push(idea);

    localStorage.setItem("ideas", JSON.stringify(ideas));
    
  }

  useEffect(() => {
    // If statement to check that the ref is not null to satisfy typescript
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  return (
    <div className="add-idea-card" data-testid="idea-form">
      <h2>Add an idea</h2>
      
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label style={{ marginRight: "10px" }}>Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
          />
        </div>
        {errors.title?.type === 'required' && <span style={{ color: "red" }}>A title is required</span>}
        <div style={{marginTop: '20px'}}>
          <label style={{ marginRight: "10px" }}>Description</label>
          <input
            {...register("description", { required: true })}
            maxLength={140}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {errors.description?.type === 'required' && <span style={{ color: "red" }}>A description is required</span>}
        <p>Description Characters remaining: {140 - description.length} / 140</p>
        <button type="submit" className="add-idea-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
