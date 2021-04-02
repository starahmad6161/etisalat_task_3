import { Router } from '@angular/router';
import { DbService } from '../../core/services/db.service';
import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loading:boolean = false;
  isLoggedIn:boolean = false;
  username = "";

  constructor(private _AuthService:AuthService, private _DbService:DbService, private _Router:Router) { }

  ngOnInit(): void {
    this._AuthService.isLoggedIn().subscribe((user:any) => {
      this.isLoggedIn = !!user?.uid;
      if (this.isLoggedIn) {
        this._DbService.getUserInfo(user?.uid).subscribe((data:any) => {
          this.username = data.payload.data()['username'];
          this._DbService.username = this.username;
          this._DbService.uId = user.uid;
        });
      }
    })
  }

  logout() {
    this.loading = true;
    this._AuthService.logout().then(() => {
      this.loading = false;
      window.localStorage.clear();
      this._Router.navigate(["/login"])
    });
  }

}
