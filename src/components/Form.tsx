import "../styles/IdeaForm.css";
import { useForm} from "react-hook-form";
import {v4 as uuidv4} from 'uuid'
import { IdeaContextType, IdeaType} from "../types/Idea";
import { useContext } from "react";
import {IdeaContext} from "../context/IdeaContext";



type FormType = {
  idea?: IdeaType
  isAddForm: boolean
}

type Inputs = {
  title: string,
  description: string,
};

const Form = ({idea, isAddForm}: FormType) => {
  //@ts-ignore
  const {handleAddIdea, handleUpdateIdea } = useContext(IdeaContext) as IdeaContextType;
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<Inputs>({
    defaultValues: {
      title: idea ? idea.title : '',
      description: idea?  idea.description: ''
    }
  });


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
  }

  return (
    <div className="add-idea-card">
     {isAddForm && <h2>Add an idea</h2> }
      
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label>
            Title
          <input
            type="text"
            autoFocus={true}
            {...register("title", { required: true })}
            style={{ marginRight: "10px" }}
            onChange={(e) => updateTitle(e.target.value)}
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
            onChange={(e) => updateDescription(e.target.value)}
          />
          </label>
        </div>
        {errors.description?.type === 'required' && <span style={{ color: "red" }}>A description is required</span>}
        {isAddForm && 
        <>
        <p>Description Characters remaining: {140 - watch("description").length} / 140</p>
        <button type="submit" className="add-idea-button">
          Submit
        </button>
        </>
        }
      </form>
    </div>
  );
};

export default Form;
