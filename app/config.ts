import { Injectable } from '@angular/core';

@Injectable()
export class Config{
    appUrl: Object;
    apiUrl: Object;
    salesforce: Object;
    passshack: Object;

    constructor(){
        this.appUrl = {
            live: "https://tech.brafton.com/braftonCoreApiProxy/",
            dev: "http://locahost/braftonCoreApi/"
        }
    }
}