const URL = '/sites/dev/_api/Web/Lists(guid\'44da09e2-9766-40c7-a48a-4680f6ef4700\')/Items';
const headers = { accept: "application/json;odata=verbose" };

const convertItem = (item) => {
  console.log(item);
  const {Id, Title, Completed} = item;
  return {id: Id, title: Title, completed: Completed};
}

export default class apiService {
  private baseUrl: string;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }


  public getListItems = async () => {
    const result = await fetch(`${this.baseUrl}${URL}`, {headers});

    if (!result.ok) {
      throw new Error(`Could not fetch data, received ${result.status}`);
    }

    return await result.json()
      .then(({d}) => d.results)
      .then(res => res.map(item => convertItem(item)));
  }


}
