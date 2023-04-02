import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule } from '@angular/forms';

import { UsuarioService } from 'src/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit{
  items:any;
  loginForm:any;
  usuarioValido:boolean;
  pwdValido:boolean;
  constructor(
    private formBuilder:FormBuilder,
    private usuarioService:UsuarioService
  ){
    this.usuarioValido=true;
    this.pwdValido=true;
    this.loginForm=this.formBuilder.group({
      username:'',
      password:''
    });
  }
  ngOnInit(): void {
  }
  onSubmit(usuarioData:any){
    // console.log(this.usuarioForm.get('username'));
    this.usuarioService.login(usuarioData).subscribe(
      response=>{
        if(response.result){
          this.loginForm.reset();
        }
      },error=>{
        switch (error.status){
          case 405:{
            this.usuarioValido=false;
            break;
          };
          case 404:{
            switch (error.error.message){
              case 'no usuario':{
                this.usuarioValido=false;
                break;
              };
              case 'no password':{
                console.log("NO PWD");
                break;
              };
            }
            break;
          }
        }
      }
    );
    // console.warn(usuarioData);
  }
  f(campo:string){
    var jj=this.loginForm.get(campo);
    if( jj.value=='' && jj.touched){
      return false;
    }else{
      return true;
    }
  }
  resetUser(){
    if(!this.usuarioValido) this.usuarioValido=true;
  }
  resetPwd(){
    if(!this.pwdValido) this.pwdValido=true;
  }
}
