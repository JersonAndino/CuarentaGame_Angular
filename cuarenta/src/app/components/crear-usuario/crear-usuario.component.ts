import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule } from '@angular/forms';

import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers:[UsuarioService]
})
export class CrearUsuarioComponent implements OnInit{
  items:any;
  usuarioForm:any;
  usuarioValido:boolean;
  constructor(
    private formBuilder:FormBuilder,
    private usuarioService:UsuarioService
  ){
    this.usuarioValido=true;
    this.usuarioForm=this.formBuilder.group({
      username:'',
      password:''
    });
  }
  ngOnInit(): void {
  }
  onSubmit(usuarioData:any){
    // console.log(this.usuarioForm.get('username'));
    this.usuarioService.guardarUsuario(usuarioData).subscribe(
      response=>{
        if(response.result){
          this.usuarioForm.reset();
        }
      },error=>{
        switch (error.status){
          case 405:{
            this.usuarioValido=false;
            break;
          }
        }
      }
    );
    // console.warn(usuarioData);
  }
  f(campo:string){
    var jj=this.usuarioForm.get(campo);
    if( jj.value=='' && jj.touched){
      return false;
    }else{
      return true;
    }
  }
  reset(){
    if(!this.usuarioValido) this.usuarioValido=true;
  }
}
