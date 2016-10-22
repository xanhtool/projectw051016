import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BrickService } from '../shared/services/brick.service';
import { MasonryModule } from 'angular2-masonry';
import { CreateNoteComponent } from './create-note/create-note.component';
import { UpgradeRoleComponent } from './upgrade-role/upgrade-role.component';
import { LoginComponent } from './login/login.component';
import { PopupNoteComponent } from './popup-note/popup-note.component';
import { PopupAngelComponent } from './popup-angel/popup-angel.component';


@NgModule({
  imports: [
    CommonModule,
    MasonryModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    NoteComponent,
    CreateNoteComponent,
    UpgradeRoleComponent,
    LoginComponent,
    PopupNoteComponent,
    PopupAngelComponent
  ],
  providers: [
    BrickService
  ],

})
export class NoteModule { }
