import * as React from "react";
import { IAppProps } from "./IAppProps";
import UserInfo from "../UserInfo";
import TodoList from "../TodoList";
import styles from "./App.module.scss";
import apiService from "../../services/api.service";

export const App: React.FunctionComponent<IAppProps> = ({email, name, description, absoluteUrl}) => {
  const api = new apiService(absoluteUrl);
  api.getListItems().then(res => console.log("App", res));
  const todoItems = [];
  todoItems.push({id: "1", title: "first", completed: false});
  todoItems.push({id: "2", title: "second", completed: true});

  return (
    <div className={styles.App}>
      <h2>App component</h2>
      <h3> {description} </h3>
      <UserInfo email={email} name={name}/>
      {todoItems.length > 0
        ? <TodoList items={todoItems}/>
        : <div>No items to show</div>
      }
    </div>
  );
};
