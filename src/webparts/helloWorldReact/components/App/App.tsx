import * as React from "react";
import { IAppProps } from "./IAppProps";
import UserInfo from "../UserInfo";
import TodoList from "../TodoList";
import styles from "./App.module.scss";
import apiService from "../../services/api.service";
import {useEffect, useState} from "react";
import NewTodo from "../NewTodo";


export const App: React.FunctionComponent<IAppProps> = ({email, name, description, absoluteUrl}) => {
  const [todos, setTodos] = useState([]);
  const api = new apiService(absoluteUrl);

  const fetchData = async () => {
    await api.getListItems().then(data => setTodos(data));
  };

  const createTodo = async (title: string) => {
    await api.createListItem(title);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.App}>
      <h2>App component</h2>
      <h3> {description} </h3>
      <UserInfo email={email} name={name}/>
      <NewTodo onSubmit = {createTodo}/>
      {todos.length > 0
        ? <TodoList items={todos}/>
        : <div>No items to show</div>
      }
    </div>
  );
};
