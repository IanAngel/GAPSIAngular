import { CandidatoService } from './../../service/candidato.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logo:string = "assets/logo.png";
  candidato!:string;
  version!:string ;

  constructor(private candidatoService:CandidatoService,private router: Router) {            
    this.candidatoService.consultarVersion().subscribe(data => {            
      this.version=data;
    });

    this.candidatoService.consultarDetalle().subscribe(data => {            
      this.candidato=data;
    });
        
   }

  ngOnInit(): void {
    
  }

  continuar(){
    this.router.navigate(['/main/proveedor']);
  }

}
