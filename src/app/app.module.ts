import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatosComponent } from './datos/datos.component';
import { ServicesProvider } from '../app/services/services';

@NgModule({
  declarations: [
    AppComponent,
    DatosComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    ServicesProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
