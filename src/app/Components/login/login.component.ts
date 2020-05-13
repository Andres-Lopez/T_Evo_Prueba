import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username:new FormControl(''),
      password:new FormControl('')
    })
  }

  Login(){
    this.api.Authentication(this.loginForm.value.username,this.loginForm.value.password).subscribe((data:any)=>{
      if(data.status==403){
        console.log("Se perdio la conexion");
      }
      if(data.headers.get("Authorization") != null){
        sessionStorage.setItem("Token",data.headers.get("Authorization"));
        this.router.navigate(['home']);
      }
    })
  }

}
