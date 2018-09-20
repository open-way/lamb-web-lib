import { Component, OnInit } from '@angular/core';
import { LambTitleService } from 'lamb-web-lib';

@Component({
    selector: 'app-title',
    templateUrl: 'title.component.html',
    styleUrls: ['title.component.scss'],
})

export class TitleComponent implements OnInit {
    constructor(private lambTitleService: LambTitleService) { }

    ngOnInit() { }

    public onClick() {
        this.lambTitleService.setTitle('Nuevo Título');
    }
}
