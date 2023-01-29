import "../styles/IdeaForm.css";
import { useForm} from "react-hook-form";
import {v4 as uuidv4} from 'uuid'
import { IdeaContextType, IdeaType} from "../types/Idea";
import { useContext, useEffect, useState } from "react";
import {IdeaContext} from "../context/IdeaContext";

type FormType = {
  idea?: IdeaType
}

type Inputs = {
  title: string,
  description: string,
};

const IdeaForm = ({idea}: FormType) => {
  const [showUpdatedText, setShowUpdatedText] = useState(false);
  //@ts-ignore
  const {handleAddIdea, handleUpdateIdea, handleDeleteIdea } = useContext(IdeaContext) as IdeaContextType;
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<Inputs>({
    defaultValues: {
      title: idea ? idea.title : '',
      description: idea?  idea.description: ''
    }
  });

  const handleDelete = () => {
    if(!idea) {
      return
    }
    handleDeleteIdea(idea.id)
  };


  const submitForm = ( data: Inputs) => {
    handleAddIdea({
      id: uuidv4(),
      title: data.title,
      description: data.description,
      createdAt: new Date().toLocaleString(),
    })

    reset()
  }

  const updateTitle = (newTitle: string) => {
    if(!idea) {
      return
    }
    handleUpdateIdea({
      ...idea,
      title: newTitle,
     updatedAt: new Date().toLocaleString(),
    })
    setShowUpdatedText(true)
  }

  const updateDescription = (newDescription: string) => {
    if(!idea) {
      return
    }
    handleUpdateIdea({
      ...idea,
      description: newDescription,
     updatedAt: new Date().toLocaleString(),
    })
    setShowUpdatedText(true)
  }

  useEffect(() => {
    setTimeout(function () {
      setShowUpdatedText(false);
    }, 3000);
  }, [showUpdatedText]);

  return (
    <div className="idea-tile-container">
     {!idea && <h2>Add an idea</h2> }
      
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label>
            Title
          <input
            type="text"
            autoFocus={!idea}
            {...register("title", { required: true })}
            style={{ marginLeft: "10px" }}
            onBlur={(e) => updateTitle(e.target.value)}
            className={!idea ? '' : 'update-input'}
          />
          </label>
        </div>
        {errors.title?.type === 'required' && <span style={{ color: "red" }}>A title is required</span>}
        <div style={{marginTop: '20px'}}>
          <label>
            Description
          <input
            {...register("description", { required: true })}
            maxLength={140}
            style={{ marginLeft: "10px" }}
            onBlur={(e) => updateDescription(e.target.value)}
            className={!idea ? '' : 'update-input'}
          />
          </label>
        </div>
        {showUpdatedText && <h3 style={{ color: "blue" }}>Idea updated!</h3>}
        {errors.description?.type === 'required' && <span style={{ color: "red" }}>A description is required</span>}
        {!idea && 
        <>
        <p>Description Characters remaining: {140 - watch("description").length} / 140</p>
        <button type="submit" className="add-idea-button">
          Submit
        </button>
        </>
        }
      </form>
      {idea && <p>Created at: {idea.createdAt}</p> }
        {idea && idea.updatedAt && <p>Updated at: {idea.updatedAt}</p>}
      {idea && <button className="delete-idea-button" onClick={handleDelete}>
          Delete
        </button> }
    </div>
  );
};

export default IdeaForm;
