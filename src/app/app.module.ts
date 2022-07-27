import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './page/common-element/header/header.component';
import { FooterComponent } from './page/common-element/footer/footer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CompleteComponent,
    ErrorComponent,
    P01LoginComponent,
    P02LogoutComponent,
    P03HomeComponent,
    P04TimeComponent,
    P05ForumComponent,
    P06ImageComponent,
    P07MovieComponent,
    P08UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
