
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export interface LambMenuBag {
    tag: string;
    item: LambMenuItem;
}

export abstract class LambMenuItem {

    /**
     * Título del elemento.
     */
    title: string;
    /**
     * Nombre de la clase del icono.
     */
    icon?: string;
    /**
     * target del link del HTML.
     */
    target?: string;
    /**
     * Elemento Escondido.
     */
    hidden?: boolean;
    /**
     * URL del elemento (absolute)
     */
    url?: string;
    /**
     * Cuando este es el elemto home.
     */
    home?: boolean;
    /**
     * Link relativo del elemento (para routerLink)
     */
    link?: string;
    /**
     * El elemento se selecciona cuando es parcial o totalmente igual a la URL actual
     */
    // tslint:disable-next-line:no-inferrable-types
    pathMatch?: string = 'full';
    /**
     * Altura de los elemento hijos.
     */
    // tslint:disable-next-line:no-inferrable-types
    subMenuHeight?: number = 0;

    /**
     * Elementos hijos
     */
    children?: LambMenuItem[];
    /**
     * Expandido por defecto.
     */
    expanded?: boolean;

    /**
     * Si el elemento es solo un grupo (no se puede hacer clic)
     */
    group?: boolean;
    parent?: LambMenuItem;
    selected?: boolean;
    data?: any;
    fragment?: string;

    // order?: string;
    // id?: string;
}
