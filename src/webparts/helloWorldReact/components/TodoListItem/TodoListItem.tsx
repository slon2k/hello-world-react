import * as React from "react";
import "./TodoListItem.module.scss";
import {ITodoItem} from "../../interfaces";
import {useState} from "react";

export interface ITodoListItem {
  item: ITodoItem;
  deleteTodo: Function;
  updateTodo: Function;
}

export const TodoListItem: React.FunctionComponent<ITodoListItem> = ({item, deleteTodo, updateTodo}) => {
  const {id, title} = item;
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const onCancel = () => {
    setNewTitle(title);
    setEditing(false);
  }

  const onSave = () => {
    setEditing(false);
    updateTodo({...item, title: newTitle});
  }

  const onEdit = () => {
    setEditing(true)
  }

  return (
    <div>
      { editing
        ? <span>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onSave}>Save</button>
          </span>
        : <span>
            <span>{title}</span>
            <button onClick={() => setEditing(true)}>Edit</button>
          </span>
      }

      <button onClick={() => deleteTodo(id)}>Delete</button>
    </div>
  );
};
