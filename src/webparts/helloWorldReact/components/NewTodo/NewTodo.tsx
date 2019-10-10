import * as React from "react";
import "./NewTodo.module.scss";
import {useState} from "react";

export interface INewTodo {
  onSubmit: Function;
}

export const NewTodo: React.FunctionComponent<INewTodo> = ({onSubmit}) => {
  const [title, setTitle] = useState("");
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(title);
    setTitle("");
  }

  return (
    <div>
      <h4>Add todo</h4>
      <input type="text" placeholder="New todo ..." value={title} onChange={handleChange}/>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};
