import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MasonryModule } from 'angular2-masonry';

import { BrickService } from './shared/services/brick.service';
import { EmitterService } from './shared/services/emitter.service';


import { AppComponent } from './app.component';
import {Projectw051016RoutingModule} from './app-routing.module';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { AboutUsComponent } from './shared/pages/about-us/about-us.component';
import { NoteModule } from './note/note.module';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseService } from './shared/services/firebase.service';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDzZQzaFFtXEUuQZoFA88L03Ue8zsEPn1g',
  authDomain: 'projectw051016.firebaseapp.com',
  databaseURL: 'https://projectw051016.firebaseio.com',
  storageBucket: ''
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MasonryModule,
    Projectw051016RoutingModule,
    NoteModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [
    BrickService,
    EmitterService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
