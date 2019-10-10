import * as React from "react";
import { ITodoItem } from "../../interfaces";
import styles from "./TodoList.module.scss";
import {TodoListItem} from "../TodoListItem/TodoListItem";

type TodoItems = Array<ITodoItem>;

interface ITodoList{
  items: TodoItems;
}

const todoItem = (item) => {
  return(
      <li key={item.id}>
        <TodoListItem id={item.id} completed={item.completed} title={item.title}/>
      </li>
  );
};

export const TodoList: React.FunctionComponent<ITodoList> = ({items}) => {
  return (
    <div className={styles.TodoList}>
      <h3>Todo List</h3>
      <ul>
        {items.map(item => todoItem(item))}
      </ul>
    </div>
  );
};
