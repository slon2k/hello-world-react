const URL = '/_api/Web/Lists(guid\'44da09e2-9766-40c7-a48a-4680f6ef4700\')/Items';
const headers = { accept: "application/json;odata=verbose" };

const convertItem = (item) => {
  const {Id, Title, Completed} = item;
  return {id: Id, title: Title, completed: Completed};
};

export default class apiService {
  private baseUrl: string;
  private requestDigest: string = "";

  private fetchDigest = async () => {
    const result = await fetch(`${this.baseUrl}/_api/contextinfo`, {method: 'POST', headers: { accept: "application/json;odata=verbose" }});

    if (!result.ok) {
      console.error(result);
      throw new Error(`Could not fetch data, received ${result.status}`);
    }

    return await result.json()
      .then(({d}) => d)
      .then(({GetContextWebInformation}) => GetContextWebInformation)
      .then(({FormDigestValue}) => FormDigestValue);

  }

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.fetchDigest()
      .then(digest => {
        this.requestDigest = digest;
      });
  }

  private createHeaders = (method) => {

    if (method == "POST") {
      return (
        { "accept": "application/json;odata=verbose",
          "content-type": "application/json;odata=verbose",
          "content-length": `<length of post body>`,
          "X-RequestDigest": this.requestDigest
        });
    }

    if (method == "DELETE") {
      return (
        { "accept": "application/json;odata=verbose",
          "content-type": "application/json;odata=verbose",
          "IF-MATCH": "*",
          "X-HTTP-Method":"DELETE",
          "X-RequestDigest": this.requestDigest
        });
    }

    return (
      { accept: "application/json;odata=verbose" }
    );
  }

  public getListItems = async () => {
    const result = await fetch(`${this.baseUrl}${URL}`, {headers});

    if (!result.ok) {
      console.error(result);
      throw new Error(`Could not fetch data, received ${result.status}`);
    }

    return await result.json()
      .then(({d}) => d.results)
      .then(res => res.map(item => convertItem(item)));
  }

  public createListItem = async (title: string) => {

    const result = await fetch(
      `${this.baseUrl}${URL}`,
      {
        method: 'POST',
        headers: this.createHeaders("POST"),
        body: JSON.stringify({ __metadata: { "type": "SP.ListItem" }, Title: title, Completed: false})}
        );

    if (!result.ok) {
      console.error(result);
      throw new Error(`Could not create data, received ${result.status}`);
    }

    return await result.json();

  }

  public deleteListItem = async (id: string) => {

    const result = await fetch(
      `${this.baseUrl}${URL}(${id})`,
      {
        method: 'POST',
        headers: this.createHeaders("DELETE"),}
    );

    if (result.status != 200) {
      console.error(result);
      throw new Error(`Could not create data, received ${result.status}`);
    }

    return result.status;

  }
}
