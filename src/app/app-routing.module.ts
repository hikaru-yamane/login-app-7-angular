import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteComponent } from './page/common-page/complete/complete.component';
import { ErrorComponent } from './page/common-page/error/error.component';
import { P01LoginComponent } from './page/p01-login/p01-login.component';
import { P02LogoutComponent } from './page/p02-logout/p02-logout.component';
import { P03HomeComponent } from './page/p03-home/p03-home.component';
import { P04TimeComponent } from './page/p04-time/p04-time.component';
import { P05ForumComponent } from './page/p05-forum/p05-forum.component';
import { P06ImageComponent } from './page/p06-image/p06-image.component';
import { P07MovieComponent } from './page/p07-movie/p07-movie.component';
import { P08UserComponent } from './page/p08-user/p08-user.component';

const routes: Routes = [
  {
    path: 'login',
    component: P01LoginComponent,
  },
  {
    path: 'logout',
    component: P02LogoutComponent,
  },
  {
    path: 'home',
    component: P03HomeComponent,
  },
  {
    path: 'time',
    component: P04TimeComponent,
  },
  {
    path: 'forum',
    component: P05ForumComponent,
  },
  {
    path: 'image',
    component: P06ImageComponent,
  },
  {
    path: 'movie',
    component: P07MovieComponent,
  },
  {
    path: 'user',
    component: P08UserComponent,
  },
  {
    path: 'complete',
    component: CompleteComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {
  //   useHash: true,
  // })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
