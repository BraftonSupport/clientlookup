export class client{
    name: string;
    feedId: number;
    salesForceId: string;
    status: string;
    product: string;
    apiKey: string;
    startDate: string;
    endDate: string;
    keyArray: string[];
    constructor(_client:any){
        console.log(_client);
        this.feedId = _client.id;
        this.name = _client.name;
        this.salesForceId = _client.account.sfAccountId;
        this.status = _client.status.name;
        this.product = _client.account.businessUnit.name;
        this.apiKey = _client.apiKey;
        this.startDate = _client.started;
        this.endDate = _client.ended || null;
        this.package();
    }
    public package(){
        this.keyArray = Object.keys(this);
    }
}