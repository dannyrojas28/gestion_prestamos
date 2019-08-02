import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import {endpoint } from '../config/url.servicios';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ServicesProvider {
    
    headers = new Headers({});
    options =new RequestOptions({ headers:this.headers});
    posts: any;

    constructor(public http: Http) {
        console.log('Hello ServicesProvider Provider');
    }

    /**
   * Realiza el llamado al servicio de verificación de cédula
   * @param cedula Cédula del usuario
   * @return Promesa con la respuesta del servicio
   */
  verificarCedula(cedula){
    
    let url = endpoint;
    let data = JSON.stringify({cedula : cedula, action:"validar_cedula"});
    
    return new Promise((resolve, reject) => {
      this.http.post(url,data)
      .pipe(map(res => res.json()))
      .subscribe(result => {
            resolve(result);
      }, error => {
          reject(error);
      });
    });

  }

   /**
   * Realiza el llamado al servicio de verificación prestamos
   * @param cedula Cédula del usuario
   * @param nombres Nombres del usuario
   * @param apellidos apellidos del usuario
   * @param fechan Fecha nacimiento del usuario
   * @param empresa Nombre empresa laboral del usuario
   * @param nit Nit empresa laboral del usuario
   * @param salario Salario actual del usuario
   * @param fechai Fecha ingreso laboral del usuario a la empresa
   * @return Promesa con la respuesta del servicio
   */
  validarPrestamo(cedula,nombres,apellidos,fechan,empresa,nit,salario,fechai){
    
    let url = endpoint;
    let data = JSON.stringify({action:"validar_prestamo",cedula : cedula, nombres:nombres, apellidos:apellidos, fechan:fechan,empresa:empresa,nit:nit,salario:salario,fechai:fechai });
    
    return new Promise((resolve, reject) => {
      this.http.post(url,data)
      .pipe(map(res => res.json()))
      .subscribe(result => {
            resolve(result);
      }, error => {
          reject(error);
      });
    });

  }
}