import { Component } from '@angular/core';

@Component({
    selector: 'display-rawdata',
    template: `<div class="col-sm-12">
            <pre>Raw JSON Data from proxy server:{{ raw | json }}
                </pre>
        </div>`,
    inputs: ['raw']
})
export class DisplayRawData { }