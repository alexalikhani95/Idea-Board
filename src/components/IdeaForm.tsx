import "../styles/IdeaForm.css";
import { useForm} from "react-hook-form";
import {v4 as uuidv4} from 'uuid'


type Inputs = {
  title: string,
  description: string,
};

interface IdeaFormProps {
  addIdea: any
}

const IdeaForm = ({addIdea}: IdeaFormProps) => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: ""
    }
  });


  const submitForm = ( data: Inputs) => {
    addIdea({
      id: uuidv4(),
      title: data.title,
      description: data.description,
      createdAt: new Date().toLocaleString(),
    })

    reset()
  }

  return (
    <div className="add-idea-card" data-testid="idea-form">
      <h2>Add an idea</h2>
      
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <label style={{ marginRight: "10px" }}>Title</label>
          <input
            type="text"
            autoFocus={true}
            {...register("title", { required: true })}
          />
        </div>
        {errors.title?.type === 'required' && <span style={{ color: "red" }}>A title is required</span>}
        <div style={{marginTop: '20px'}}>
          <label style={{ marginRight: "10px" }}>Description</label>
          <input
            {...register("description", { required: true })}
            maxLength={140}
          />
        </div>
        {errors.description?.type === 'required' && <span style={{ color: "red" }}>A description is required</span>}
        <p>Description Characters remaining: {140 - watch("description").length} / 140</p>
        <button type="submit" className="add-idea-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
