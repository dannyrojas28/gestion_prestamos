# Prestamos2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.3.

ANGULAR + PHP + MYSQL

Para correr este proyecto es necesario clonarlo y seguir los pasos a continuación.

1.git cloned https://github.com/dannyrojas28/gestion_prestamos.git
2.cd gestion_prestamos
3.npm install
4.Instalar la carpeta "prestamos" en un servidor local (Xampp,Mapp) la cual contien los servicios en php
5.Pegar el SQL `prestamos.sql` en una base de datos mysql para que esta quede instalada
6.Angular esta consumiendo los servicios de php en `http://localhost:8080/prestamos/` en caso de que el puerto del servidor local cambie, se puede editar desde la ruta `/gestion_prestamos/src/app/config/url.servicios.ts`
7.La configuración de acceso a la base de datos se encuentra en la ruta `/gestion_prestamos/prestamos/index.php` en la función:


function getConnection()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "prestamos";
    
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
Estos datos se pueden editar en base a los datos del mysql local.

Eso es todo, la aplicación funciona correctamente y rapida.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
