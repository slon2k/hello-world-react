import * as React from "react";
import { ITodoItem } from "../../interfaces";
import styles from "./TodoList.module.scss";
import {TodoListItem} from "../TodoListItem/TodoListItem";

type TodoItems = Array<ITodoItem>;

interface ITodoList{
  items: TodoItems;
  deleteTodo: Function;
  updateTodo: Function;
}

const todoItem = (item, deleteTodo, updateTodo) => {
  return(
      <li key={item.id}>
        <TodoListItem item={item} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      </li>
  );
};

export const TodoList: React.FunctionComponent<ITodoList> = ({items, deleteTodo, updateTodo}) => {
  return (
    <div className={styles.TodoList}>
      <h3>Todo List</h3>
      <ul>
        {items.map(item => todoItem(item, deleteTodo, updateTodo))}
      </ul>
    </div>
  );
};
