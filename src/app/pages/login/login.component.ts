import { User } from '../../shared/interfaces/user';
import { DbService } from './../../core/services/db.service';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errMsg:string = '';
  loading:boolean = false;
  loginForm:FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder, private _AuthService:AuthService, private _DbService:DbService, private _Router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }


  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  login() {
    let email = this.email?.value;
    let password = this.password?.value;
    this.loading = true;
    this._AuthService.login(email, password).then((res:any) => {
      this.loading = false;
      this.errMsg = '';
      this._Router.navigate(["/"]);
    }).catch(err => {
      this.errMsg = err.message;
      this.loading = false;
    });
  }
}
