import * as React from "react";
import { IAppProps } from "./IAppProps";
import UserInfo from "../UserInfo";

export const App: React.FunctionComponent<IAppProps> = ({email, name, description}) => (
    <div>
      <h2>App component</h2>
      <h3> {description} </h3>
      <UserInfo email={email} name={name}/>
    </div>
);
