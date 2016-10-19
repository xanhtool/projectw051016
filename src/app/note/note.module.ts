import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';

import { BrickService } from '../shared/services/brick.service';
import { MasonryModule } from 'angular2-masonry';

@NgModule({
  imports: [
    CommonModule,
    MasonryModule
  ],
  declarations: [NoteComponent],
  providers: [
    BrickService
  ],

})
export class NoteModule { }
