import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EPS } from '../Entities/EPS';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint;
  autorization;

  constructor(private http:HttpClient) {
    this.endpoint = environment.endpoint;
  }

  Authentication(username,password){
    return this.http.post(this.endpoint + 'Identity/Autenticacion/Ingreso',null,{headers: new HttpHeaders({'username':username,'password':password}), observe:'response'});
  }

  /* CRUD */

  //Obtener

  GetEps(){
    return this.http.get(this.endpoint + 'Parametros/EPS',{headers:new HttpHeaders({'Authorization': 'bearer ' + sessionStorage.getItem("Token")})});
  }
  InsertEps(eps:EPS[]){
    return this.http.post(this.endpoint + 'Parametros/EPS',eps,{headers:new HttpHeaders({'Authorization': 'bearer ' + sessionStorage.getItem("Token")})});
  }
  UpdateEps(eps:EPS){
    return this.http.put(this.endpoint + 'Parametros/EPS',eps,{headers:new HttpHeaders({'Authorization': 'bearer ' + sessionStorage.getItem("Token")})});
  }
  DeleteEps(eps:EPS){
    return this.http.delete(this.endpoint + 'Parametros/EPS/'+eps.consecutivo,{headers:new HttpHeaders({'Authorization': 'bearer ' + sessionStorage.getItem("Token")})});
  }


}
