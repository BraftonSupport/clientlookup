import { Component } from '@angular/core';

@Component({
    selector: 'display-errors',
    template: `<div class="col-sm-6">
            <div class="text-danger">
                <h3>{{ raw.data.method }} failed</h3>
                <h4>{{ raw.message }}</h4>
                <pre>Arguments:{{ raw.data | json }}
                                </pre>
            </div>
        </div>`,
    inputs: ['raw']
})
export class DisplayErrors {
}