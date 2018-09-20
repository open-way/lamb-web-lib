import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'lamb-divider',
    template: `
        <span class="{{ icon }}"></span>
        <span class="lamb-title">{{ title }} </span>
        <p>{{ description }}</p>
        <hr>
    `,
    styleUrls: ['./divider.component.scss'],
})

export class LambDividerComponent implements OnInit {
    @Input() icon: string;
    @Input() title: string;
    @Input() description: string;

    constructor() { }

    ngOnInit() {
    }
}
