import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/Rx'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class braftonApiService {
    private _baseUrl: string = "api/index.php";

    constructor(private _http: Http) {

    }
    getAccounts(brand: string) {
        var url = this._baseUrl;
        var options = JSON.stringify({
            method: "getFeeds",
            brand: brand
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post(url, options, new RequestOptions({ headers: headers }))
            .map(data => {
                return data.json()
            });
    }
    getAccountDetails(api: string, brand: string) {
        var url = this._baseUrl;
        var options = JSON.stringify({
            arg: { "apiKey": api },
            method: "getFeed",
            brand: brand
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post(url, options, new RequestOptions({ headers: headers }))
               .map(data => {
                   return data.json()
                });
          
    }
}