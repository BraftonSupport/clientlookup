import { Component } from '@angular/core';

@Component({
    selector: 'display-client',
    template: `
<div class="col-sm-6">
            <md-card>
                <md-card-title>Feed Details</md-card-title>
                <md-list>
                    <md-list-item *ngFor="let item of keyArray" (click)="null">{{ item + " : " + client[item] }}</md-list-item>
                </md-list>
           
            </md-card>
        </div>
`,
    inputs: ['keyArray', 'client']
})
export class DisplayClient {
}