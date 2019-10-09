import * as React from "react";
import { ITodoItem } from "../../interfaces";
import styles from "./TodoList.module.scss";

type TodoItems = Array<ITodoItem>;

interface ITodoList{
  items: TodoItems;
}

export const TodoList: React.FunctionComponent<ITodoList> = ({items}) => {
  const itemsList = items.map(item => <li key={item.id}>{item.title}</li>);
  return (
    <div className={styles.TodoList}>
      <h3>Todo List</h3>
      <ul>
        {itemsList}
      </ul>
    </div>
  );
};
