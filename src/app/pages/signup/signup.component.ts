import { User } from '../../shared/interfaces/user';
import { DbService } from './../../core/services/db.service';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading:boolean = false;
  errMsg:string = '';
  signupForm:FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder, private _AuthService:AuthService, private _DbService:DbService, private _Router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern(/^[A-Z][A-z0-9]+/), Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }


  get username() {
    return this.signupForm.get("username");
  }
  get email() {
    return this.signupForm.get("email");
  }
  get password() {
    return this.signupForm.get("password");
  }


  signup() {
    if (this.signupForm.valid) {
      this.loading = true;
      this.errMsg = "";
      let email = (this.email?.value).trim();
      let password = (this.password?.value).trim();
      let username = (this.username?.value).trim();
      //Signup
      this._AuthService.signup(email, password).then(res => {
        //Add user to database
        this._DbService.addUser(res.user?.uid || "", {email, username}).then(() => {
          this.loading = false;
          this.errMsg = '';
          this._Router.navigate(["/"]);
        });
      }).catch(err => {
        this.errMsg = err.message;
        this.loading = false;
      });

    }
  }

}
