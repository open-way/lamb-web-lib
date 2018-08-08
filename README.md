# LambWebLib

LambWebLib. Es un proyecto angular de tipo Librería. que contiene una Suit de componentes reutilizables para el proyecto [Lamb Financial](https://lamb.upeu.edu.pe).

## Demo
[Demo](https://lamb.upeu.edu.pe)

## Requisitos
* Angular versión 6.0.0
* @nebular/theme Versión 2.0.0-rc.9
* Bootstrap Versión 4.1.3
* Font-awesome Versión 4.7.0

## Instalación

Debemos instalar primero los requisitos con `npm`.

Primero instalaremos Nebular.

```shell
npm install --save @nebular/theme
```
Luego instalamos Bootstrap.

```shell
npm i -save bootstrap
```

Ahora instalamos Font-awesome.

```shell
npm i --save font-awesome
```

Finalmente instalamos el paquete con el siguiente comando.

```shell
npm install lamb-web-lib
```

## Configuración de los estilos.

Modificamos nuestro archivo `angular.json` de nuestro proyecto. Debe quedar asi.

```json
"styles": [
  "./node_modules/font-awesome/scss/font-awesome.scss",
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "./node_modules/@nebular/theme/styles/prebuilt/default.css", // or cosmic.css
],
```

Luego agregar el módulo del componente que deseas utilizar en el `AppModule` o `xModule` de tu aplicación.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonIconModule, LambWebLibModule } from 'lamb-web-lib';

// Importamos el tema de Nebular
import { NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Importamos el dema `default` en nuestra aplicacíón.
     NbThemeModule.forRoot({ name: 'default' }), 

    LambWebLibModule,
    ButtonIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
y ya podras utilizarlo en tu componente html.
```html
<lamb-lamb-web-lib></lamb-lamb-web-lib>

<lamb-button-icon></lamb-button-icon>
```

Pero aún falta configurar los estilos de los componentes deberas tener tu archivo `styles.scss` carpeta `src`
y tener este código.
```scss
/* You can add global styles to this file, and also import other style files */
@import 'themes';

// framework component styles which will use your new theme
@import '~@nebular/theme/styles/globals';

// Framework lamb
@import '~lamb-web-lib/lib/styles/globals';

// install the framework
@include nb-install() {
    @include nb-theme-global();
    @include lamb-theme-global();
};
```
Ademas deberas tener otro archivo `themes.scss` a la misma altura y tenerlo asi:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';

// Aqui podrás personalizar tus estilos. Gracias el framework de Nebular.
$nb-themes: nb-register-theme((
  separator: #ebeef2,
  color-primary: #7f264a,
//   header-bg: #611F3A,
  form-control-border-width: 1px,
), default, default);
```
Si deseas saber mas de como personalizar tus temas. ingresa a [temas de Nebular](https://akveo.github.io/nebular/docs/guides/enable-theme-system#basic-setup)
## Colaboradores.

* 
* 

## Autores

* [Vitmar J. Aliaga Cruz](https://github.com/valiaga).
* [Guido L. Calsina Tipo](https://github.com/tiposaurio).

## Licencia

Este proyecto esta bajo la licencia MIT.
