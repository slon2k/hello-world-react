import * as React from 'react';
import styles from './HelloWorldReact.module.scss';
import { IHelloWorldReactProps } from './IHelloWorldReactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { UserInfo } from './UserInfo/UserInfo';


export default class HelloWorldReact extends React.Component<IHelloWorldReactProps, {}> {
  public render(): React.ReactElement<IHelloWorldReactProps> {
    return (
      <div className={ styles.helloWorldReact }>
        <UserInfo email={this.props.email} name={this.props.name}/>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
