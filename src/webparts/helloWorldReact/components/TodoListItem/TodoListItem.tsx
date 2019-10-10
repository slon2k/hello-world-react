import * as React from "react";
import "./TodoListItem.module.scss";
import {ITodoItem} from "../../interfaces";

export const TodoListItem: React.FunctionComponent<ITodoItem> = ({id, title, completed}: ITodoItem) => {
  return (
    <div>
      <span>{id}</span>*
      <span>{title}</span>

    </div>
  );
};
