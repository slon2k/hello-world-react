const URL = '/_api/Web/Lists(guid\'44da09e2-9766-40c7-a48a-4680f6ef4700\')/Items';
const headers = { accept: "application/json;odata=verbose" };
const headersPost = {
  "accept": "application/json;odata=verbose",
  "content-type": "application/json;odata=verbose",
  "content-length": `<length of post body>`,
  "X-RequestDigest": `0xC6FA8E2147C0E616DC5CC4E637F40D0F5559FC7E96E2090B62C4AFFF02E389521A30864D6B613D44874D072B46D3055454D12BE3F1BA88B6B9463C544587BDC6,10 Oct 2019 07:49:59 -0000`
}

const convertItem = (item) => {
  console.log(item);
  const {Id, Title, Completed} = item;
  return {id: Id, title: Title, completed: Completed};
};

export default class apiService {
  private baseUrl: string;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
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
    //fetch(`/_api/contextinfo`, {method: 'POST'}).then(res => console.log);

    const result = await fetch(
      `${this.baseUrl}${URL}`,
      {method: 'POST',
        headers: headersPost,
        body: JSON.stringify({ __metadata: { "type": "SP.ListItem" }, Title: title, Completed: false})}
        );

    if (!result.ok) {
      console.error(result);
      throw new Error(`Could not create data, received ${result.status}`);
    }

    return await result.json();

  }

}
