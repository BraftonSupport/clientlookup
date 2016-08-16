import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input/input';
import { MdListModule } from '@angular2-material/list';
import { MdCheckboxModule } from '@angular2-material/checkbox';
//import { MdProgressBarModule } from '@angular2-material/progress-bar';

import { AppComponent }  from './app.component';
import { DisplayClient } from './components/display-client.component';
import { loader } from './components/loader.component';
import { DisplayErrors } from './components/display-errors.component';
import { DisplayRawData } from './components/raw-data.component';
import { AuthSettings } from './auth0/auth.settings';

@NgModule({
    imports: [
        BrowserModule,
        MdButtonModule,
        MdCardModule,
        MdInputModule,
        MdListModule,
        MdCheckboxModule,
        //MdProgressBarModule,
        HttpModule,
        JsonpModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        DisplayClient,
        loader,
        DisplayErrors,
        DisplayRawData
    ],
    providers: [
        AuthSettings    
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
