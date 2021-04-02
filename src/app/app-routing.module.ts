import { ChatComponent } from './pages/chat/chat.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieComponent } from './pages/movie/movie.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MovieResolver } from './core/guards/movie.resolve';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "movie/:id", component: MovieComponent, canActivate: [AuthGuard], resolve: {movieDetails: MovieResolver}},
  {path: "favorite", component: FavoriteComponent, canActivate: [AuthGuard]},
  {path: "chat", component: ChatComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "**", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
