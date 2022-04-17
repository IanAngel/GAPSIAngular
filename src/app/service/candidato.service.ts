import { GenericHttpService } from './generic-http.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService extends GenericHttpService<string>{

  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/candidato`);
   }

  consultarDetalle() {
    return this.http.get<string>(`${this.url}/detalle`, {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'text/plain; charset=utf-8'
      }),
      responseType: 'text'  as 'json',
    });
  }

  consultarVersion() {
    return this.http.get<string>(`${this.url}/version`, {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'text/plain; charset=utf-8'
      }),
      responseType: 'text'  as 'json',
    });
  }
  
}
