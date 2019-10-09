import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldReactWebPartStrings';
import {App, IAppProps} from "./components/App";

export interface IHelloWorldReactWebPartProps {
  description: string;
}

export default class HelloWorldReactWebPart extends BaseClientSideWebPart<IHelloWorldReactWebPartProps> {

  public render(): void {
    const {email, displayName} = this.context.pageContext.user;
    console.log(this.context.pageContext.user);
    const {absoluteUrl} = this.context.pageContext.site;

    const element: React.ReactElement<IAppProps> = React.createElement(
      App,
      {
        description: this.properties.description,
        email: email,
        name: displayName,
        absoluteUrl: absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
