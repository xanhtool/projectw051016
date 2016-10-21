import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { FormsModule }   from '@angular/forms';

import { BrickService } from '../shared/services/brick.service';
import { MasonryModule } from 'angular2-masonry';
import { CreateNoteComponent } from './create-note/create-note.component';
import { UpgradeRoleComponent } from './upgrade-role/upgrade-role.component';

@NgModule({
  imports: [
    CommonModule,
    MasonryModule,
    FormsModule
  ],
  declarations: [NoteComponent, CreateNoteComponent, UpgradeRoleComponent],
  providers: [
    BrickService
  ],

})
export class NoteModule { }
