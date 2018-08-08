import { trigger, style, transition, animate, state } from '@angular/animations';

export const slideOfRight = trigger('slideOfRight', [
    transition(
        ':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('.35s', style({ transform: 'translateX(0)', 'opacity': 1 })),
        ],
    ),
    transition(
        ':leave', [
            style({ transform: 'translateX(0)', 'opacity': 1 }),
            animate('.35s', style({ transform: 'translateX(100%)', 'opacity': 0 })),
        ],
    ),

    state('true', style({ height: '0px', transform: 'scaleY(0)' /*opacity: 0*/ })),
    state('false', style({ height: '*', transform: 'scaleY(1)' /*opacity: 1*/ })),

    transition('true => false', [
        style({ transform: 'translateX(100%)', display: 'none' }),
        animate('.35s', style({ transform: 'translateX(0)', display: 'block' })),
    ]),
    transition('false => true', [
        style({ transform: 'translateX(0)', display: 'block' }),
        animate('.35s', style({ transform: 'translateX(100%)', display: 'none' })),
    ]),
]);
