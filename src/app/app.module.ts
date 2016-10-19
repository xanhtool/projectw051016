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
    NoteModule
  ],
  providers: [
    BrickService,
    EmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
