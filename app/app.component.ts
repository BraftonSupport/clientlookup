import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HTTP_PROVIDERS} from '@angular/http';
import { FORM_DIRECTIVES } from '@angular/forms';
import { MdButtonModule, MdButton } from '@angular2-material/button';
import { MdInputModule, MdInput } from '@angular2-material/input/input';
import { MdListModule, MdList } from '@angular2-material/list';
import { MdCheckboxModule, MdCheckbox  } from '@angular2-material/checkbox';
import 'rxjs/Rx';

import { braftonApiService } from './braftonapi/braftonapi.service';
import { client } from './client/clientClass';
import { DisplayClient } from './components/display-client.component';
import { Auth } from './auth0/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: "templates/main.html",
    providers: [braftonApiService, HTTP_PROVIDERS,Auth]
})
export class AppComponent implements OnInit {
    public requestRawData: boolean = false;
    public requestFailed = false;
    public isLoadingInfo = false;
    public rawData:any;
    public client: client;
    private clientLoaded: boolean = false;
    public FormData = {
        apiKey: "",
        brand: "brafton",
        requestRawData: false
    };
    public keyArray: Array<string>;
    public options = [
        {
            "name": "Brafton Core",
            "value": "brafton"
        },
        {
            "name": "Brafton SMB",
            "value": "brafton"
        },
        {
            "name": "ContentLEAD",
            "value": "contentlead"
        }

    ]
    constructor(private _ApiService: braftonApiService, private auth: Auth) {
       
    }
    ngOnInit() {

        if (!this.auth.authenticated()) {
            this.auth.login();
        }
        /*
         * finsihed method will check if authenticated and change path to the Account Information path "/accountInformation"
         * and return.  otherwise it will show the login widget
         */
        //if (this.auth.authenticated()) {
        //    rounter.path("AccountInformation");
        //    return;
        //}
        //this.auth.login();
    }
    logout() {
        this.auth.logout();
        window.location.reload();
    }
    findAccounts() {
        this._ApiService.getAccounts("brafton").subscribe(res => {
            this.isLoadingInfo = false;
            console.log(res)
        });
    }
    findAccount() {
        this.isLoadingInfo = true;
        this.clientLoaded = false;
        this.requestFailed = false;
        setTimeout(() => {
            this.getClientInfo(this.FormData.apiKey, this.FormData.brand);

        }, 2000);
        
    }
    getClientInfo(apiKey: string, brand: string) {
        var result = this._ApiService.getAccountDetails(apiKey, brand).subscribe(res => {
            this.isLoadingInfo = false;
            if (res.success) {
                this.rawData = res.data;
                this.clientLoaded = true;
                this.client = new client(res.data);;
                this.keyArray = this.client.keyArray;
            }else{
                console.log(res);
                this.rawData = res;
                this.requestFailed = true;
                console.log(!this.requestFailed);

            }
            });
    }
}
