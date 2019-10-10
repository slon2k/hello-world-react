import * as React from "react";
import "./TodoListItem.module.scss";
import {ITodoItem} from "../../interfaces";

export interface ITodoListItem {
  item: ITodoItem;
  deleteTodo: Function;
}

export const TodoListItem: React.FunctionComponent<ITodoListItem> = ({item, deleteTodo}) => {
  const {id, title} = item;
  return (
    <div>
      <span>{id}</span>*
      <span>{title}</span>
      <button onClick={() => deleteTodo(id)}>Delete</button>
    </div>
  );
};
