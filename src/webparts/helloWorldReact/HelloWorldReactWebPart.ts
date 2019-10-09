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
    console.log(this.context);

    const URL = '/sites/dev/_api/Web/Lists(guid\'44da09e2-9766-40c7-a48a-4680f6ef4700\')/Items';
    const {absoluteUrl} = this.context.pageContext.site;

    fetch(`${absoluteUrl}${URL}`,
      {headers:
          { accept: "application/json;odata=verbose" }
    })
      .then(result => result.json())
      .then(({d}) => console.log(d.results))
      .catch(error => console.error(error));

    const element: React.ReactElement<IAppProps> = React.createElement(
      App,
      {
        description: this.properties.description,
        email: email,
        name: displayName,
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
