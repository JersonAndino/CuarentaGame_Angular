import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Subject } from 'rxjs';
@Injectable()
export class UsuarioService{
    public url:string;
    public loggedIn:Subject<Boolean>;
    public user:Subject<string>;
    public id:Subject<any>;
    constructor(
        private _http:HttpClient,
        //private toastr: ToastrService
    ){
        this.url=Global.url;
        this.loggedIn=new Subject();
        this.user=new Subject();
        this.id=new Subject();
        this.getLogin();
    }

// guardar usuario
//http://localhost:3600/create-user
guardarUsuario(usuario:any):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    // console.log(params);
    return this._http.post(this.url+'usuario',params,{headers:headers});
}
// login
//http://localhost:3600/login
login(data:any):Observable<any>{
    let params=JSON.stringify(data);
    // console.log(params);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login',params,{headers:headers, withCredentials:true});
}
// logout
//http://localhost:3600/logout
logout():Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'logout',{headers:headers,withCredentials:true});
}

getLogin(){
    let headers=new HttpHeaders().set('Content-Type','application/json');
    this._http.get(Global.url + 'login', {headers:headers,withCredentials:true}).subscribe((resp: any) => {
        this.loggedIn.next(resp.loggedIn);
        this.user.next(resp.user);
        this.id.next(resp.id);
      }, (errorResp) => {
        //this.toastr.error('Oops, something went wrong getting the logged in status')
        //console.log('Oops, something went wrong getting the logged in status');
      })   
  }

}