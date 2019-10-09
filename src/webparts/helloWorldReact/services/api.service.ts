const URL = '/sites/dev/_api/Web/Lists(guid\'44da09e2-9766-40c7-a48a-4680f6ef4700\')/Items';
const headers = { accept: "application/json;odata=verbose" };

export default class apiService {
  private baseUrl: string;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  public getListItems = async () => {
    return await fetch(`${this.baseUrl}${URL}`, {headers})
      .then(result => result.json())
      .then(({d}) => d.results)
      .catch(error => console.error(error));
  }
}
