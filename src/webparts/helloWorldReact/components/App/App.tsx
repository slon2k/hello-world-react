import * as React from "react";
import { IAppProps } from "./IAppProps";
import UserInfo from "../UserInfo";
import TodoList from "../TodoList";
import styles from "./App.module.scss";
import apiService from "../../services/api.service";
import {useState} from "react";

export const App: React.FunctionComponent<IAppProps> = ({email, name, description, absoluteUrl}) => {
  const [todos, setTodos] = useState([]);
  const api = new apiService(absoluteUrl);
  const res = api.getListItems().then(result => setTodos(result));
  //todoItems.push({id: "1", title: "first", completed: false});
  //todoItems.push({id: "2", title: "second", completed: true});
  return (
    <div className={styles.App}>
      <h2>App component</h2>
      <h3> {description} </h3>
      <UserInfo email={email} name={name}/>
      {todos.length > 0
        ? <TodoList items={todos}/>
        : <div>No items to show</div>
      }
    </div>
  );
};
