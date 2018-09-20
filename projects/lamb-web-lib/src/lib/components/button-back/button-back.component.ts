/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'lamb-button-back',
    template: `
        <a class="btn btn-light lamb-button" [ngClass]="{'lamb-flag': flag}" (click)="onBack()">
            <span class="fa fa-reply" > </span>
        </a>
    `,
    styles: [
        `
        .lamb-flag {
          visibility: hidden;
        }
        .lamb-button {
          /* padding: 0.3rem 0.6rem; */
          padding: 0.1rem 0.3rem;
          cursor: pointer !important;
          border-radius: 50%;
          -webkit-transition: -webkit-transform .4s ease-in-out;
          transition: transform .4s ease-in-out;
        }
        .lamb-button:hover {
          -webkit-transform: rotate(-360deg);
          transform: rotate(-360deg)
        }
        `,
    ],
})

export class LambButtonBackComponent implements OnInit {
    public flag: Boolean = true;
    // private pathBack: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private location: Location) { }

    ngOnInit() {
        /** Estos dos metodos son para el flag. */
        this.initShowOrHideFlag();
        this.eventFlagSubscribe();
    }

    private initShowOrHideFlag() {
        const pathEnd = this.pathEnd(this.location.path());
        this.condition(pathEnd);
    }

    private eventFlagSubscribe() {
        this.router.events.pipe(
            filter(path => path instanceof NavigationEnd),
        )
            .subscribe((path: any) => {
                const pathEnd = this.pathEnd(path.url);
                this.condition(pathEnd);
            });
    }
    private pathEnd(path: string): string {
        const paths = path.split('/')
            .filter(path2 => path2 !== '');
        return paths[paths.length - 1];
    }

    private condition(pathEnd: string): void {
        const url: UrlSegment[] = this.route.snapshot.url;
        if (((url[0] && url[0].path) === pathEnd)) {
            this.flag = true;
        } else if (url[0] == null) {
            const urlParent = this.route.parent.snapshot.url;
            if (((urlParent[urlParent.length - 1] && urlParent[urlParent.length - 1].path) === pathEnd)) {
                this.flag = true;
            } else {
                this.flag = false;
            }
        } else {
            this.flag = false;
        }
    }

    public onBack() {
        const url: UrlSegment[] = this.route.snapshot.url;
        const link = (url[0] && url[0].path) || '';
        const relativeUrl = link ? `../${link}` : `./${link}`;
        this.router.navigate([relativeUrl], { relativeTo: this.route });
    }
}

