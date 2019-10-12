import * as React from "react";
import styles from "./TodoListItem.module.scss";
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

  const cancel = () => {
    setNewTitle(title);
    setEditing(false);
  }

  const save = () => {
    setEditing(false);
    updateTodo({...item, title: newTitle});
  }

  const edit = () => {
    setEditing(true)
  }

  const onKeyDown = (e) => {
    if (e.key == "Enter") {
      save();
    }
  }

  const handleCheck = () => {
    updateTodo({...item, completed: !item.completed});
  }

  const handleChange = (e) => {
    setNewTitle(e.target.value)
  }

  return (
    <div className={styles.TodoListItem}>
      <input type="checkbox" onChange={handleCheck} checked={item.completed}/>
      { editing
        ? <span>
            <input type="text" value={newTitle} onChange={handleChange} onKeyDown={onKeyDown}/>
            <button onClick={cancel}>Cancel</button>
            <button onClick={save}>Save</button>
          </span>
        : <span>
            <span className={item.completed ? styles.completed : ""}>{title}</span>
            <button onClick={edit}>Edit</button>
          </span>
      }

      <button onClick={() => deleteTodo(id)}>Delete</button>
    </div>
  );
};
