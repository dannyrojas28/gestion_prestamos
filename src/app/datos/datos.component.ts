import { Component, OnInit } from '@angular/core';
import { ServicesProvider } from '../services/services';
import { FormBuilder, FormGroup, Validators,ValidationErrors,ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;
  cedula = "";
  alert_cedula = true;
  error_cedula = "";
  nombres = "";
  alert_nombres=true;
  apellidos = "";
  alert_apellidos=true;
  fecha_nacimiento = "";
  alert_fechan=true;
  error_fechan="";
  readonly_cedula=false;
  otros_datos=true;
  botoncedula =false;
  datospersonales=false;
  datoslaborales=true;
  empresa = "";
  nit = "";
  salario = 0;
  fechaI="";
  boton_prestamo=true;
  form2=false;
  alert_empresa=true;
  alert_salario=true;
  alert_nit=true;
  alert_fechaI=true;
  error_fechaI="";
  error_salario="";
  alert_prestamo=true;
  error_prestamo="";
  alert_prestamook=true;
  success_prestamo="";
 


  constructor(public fb: FormBuilder,public services:ServicesProvider ) {
    this.myForm = this.fb.group({
      cedula: [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')],
      nombres:[],
      apellidos:[],
      fecha_nacimiento:[]
    });
    this.myForm2 = this.fb.group({
      nit: [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')],
      empresa:[Validators.required],
      salario:[Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')],
      fecha_ingreso:[Validators.required]
    });
   }

  ngOnInit() {
  }

  ValidateCedula() {
    if(this.cedula.length >= 7 && this.cedula.length <= 10) {
      this.alert_cedula=true;
      this.error_cedula="";
      this.services.verificarCedula(this.cedula).then(
        (data) => {
          if(data['response']==true){
            if(data['existe']==false){
                this.botoncedula=true;
                this.readonly_cedula=true;
                this.otros_datos=false;
            }else{
              this.alert_cedula=false;
              this.error_cedula = "Ups! este número de cédula ya se encuentra registrado.";
            }
          }else{
            this.alert_cedula=false;
            this.error_cedula = "Hemos tenido un error al realizar tu solicitud";
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }else{
      this.alert_cedula=false;
      this.error_cedula = "Debes ingresar un numero mayor a 7 caracteres y menor a 10 caracteres";
    }
  }

  DatosPrincipales(){
    this.alert_nombres=true;
    this.alert_apellidos=true;
    if(this.nombres != "") {
      if(this.apellidos != "") {
        if(this.fecha_nacimiento != "0000-00-00" && this.fecha_nacimiento!="") {
          let fn = new Date(this.fecha_nacimiento);
           let years=this.validateAge(fn.getDate(),fn.getMonth(),fn.getFullYear())
           console.log(years)
          if(years!= undefined && years<=-18){
            this.alert_fechan=true;
            this.error_fechan="";
            this.datospersonales=true;
            this.datoslaborales=false;
          }else{
            this.alert_fechan=false;
            this.error_fechan="Debes ser mayor de edad para realizar este procedimiento";
          }

        }else{
          this.alert_fechan=false;
          this.error_fechan="Debes seleccionar una fecha de nacimiento";
        }
      }else{
        this.alert_apellidos=false;
      }
    }else{
      this.alert_nombres=false;
    }
  }
  Atras(){
    this.datospersonales=false;
    this.datoslaborales=true;
  }

  ValidateLaboral(){
    this.alert_prestamo=true;
    this.alert_prestamook=true;
    this.alert_empresa=true;
    this.alert_nit=true;
    this.alert_salario=true;
    this.alert_fechaI=true;
    if(this.empresa != "") {
      if(this.nit != "") {
        if(this.salario>0 && this.salario < 100000000){
          if(this.fechaI != "0000-00-00" && this.fechaI!="") {
            let date =  new Date();
            var m = date.getMonth() + 1;
            let dat = date.getFullYear()+"-"+m+"-"+date.getDate();
            var fecha_nueva= new Date(dat);

            let fn = new Date(this.fechaI);
            var fechain=new Date(fn.getFullYear(),fn.getMonth(),fn.getDate() + 1);
            if(fechain < fecha_nueva){
              this.services.validarPrestamo(this.cedula,this.nombres,this.apellidos,this.fecha_nacimiento,this.empresa,this.nit,this.salario,this.fechaI).then(
                (data) => {
                  if(data['response']==true){
                    if(data['aprobado']==true){
                      this.alert_prestamook=false;
                      this.success_prestamo = "Felicidades! tu crédito ha sido aprobado Por: $"+data['valor'];
                    }else{
                      this.alert_prestamo=false;
                      this.error_prestamo = data['error'];
                    }
                  }else{
                    this.alert_prestamo=false;
                    this.error_prestamo = "Hemos tenido un error al realizar tu solicitud";
                  }

                  this.boton_prestamo=false;
                  this.form2=true;
                },
                (err) => {
                  console.log(err);
                }
              );
            }else{
              this.alert_fechaI=false;
              this.error_fechaI="Debes seleccionar una fecha inferior a la actual";
            }
          }else{
            this.alert_fechaI=false;
            this.error_fechaI="Debes seleccionar una fecha";
          }
        }else{
          this.alert_salario=false;
          this.error_salario="El valor minimo es $1 y el valor maximo es < a $100.000.000 ";
        }
      }else{
        this.alert_nit=false;
      }
    }else{
      this.alert_empresa=false;
    }
  }

  validateAge(day,month,year){
    let result;
        const date = moment({ year: +year, month: +month, day: +day });
      
        if (date.isValid()) {
          // https://momentjs.com/docs/#/displaying/difference/
          const now = moment();
          const yearsDiff = date.diff(now, 'years');
          result = yearsDiff;
          
        }
        return result;
  }

  
}