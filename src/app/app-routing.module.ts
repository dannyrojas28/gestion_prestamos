import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosComponent } from './datos/datos.component';

const routes: Routes = [
  {path:'',component:DatosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
