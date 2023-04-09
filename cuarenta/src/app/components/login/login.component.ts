import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from 'src/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit{
  loggedIn:any;
  items:any;
  loginForm:any;
  usuarioValido:boolean;
  pwdValido:boolean;
  constructor(
    private formBuilder:FormBuilder,
    private usuarioService:UsuarioService,
    private router:Router,
    private route:ActivatedRoute
  ){
    this.usuarioValido=true;
    this.pwdValido=true;
    this.loginForm=this.formBuilder.group({
      username:'',
      password:''
    });
  }
  ngOnInit(): void {
    this.usuarioService.loggedIn.subscribe(res=>{
      if(res==true) {this.loggedIn=true;}
      console.log(res);
      if(this.loggedIn==true){
        this.router.navigate(['/dashboard']);
      }
    });
  }
  onSubmit(usuarioData:any){
    // console.log(this.usuarioForm.get('username'));
    this.usuarioService.login(usuarioData).subscribe(
      response=>{
        if(response.result){
          this.loginForm.reset();
          window.location.reload();
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
                this.pwdValido=false;
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
  resetUsuario(){
    if(!this.usuarioValido) this.usuarioValido=true;
  }
  resetPwd(){
    if(!this.pwdValido) this.pwdValido=true;
  }
}
