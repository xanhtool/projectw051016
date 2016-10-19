import { Component, OnInit ,ViewEncapsulation, Input } from '@angular/core';

import { EmitterService } from '../shared/services/emitter.service';
import { BrickService } from '../shared/services/brick.service';
import { Brick } from '../shared/models/brick';
import { MasonryOptions } from 'angular2-masonry';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class NoteComponent implements OnInit {
  // date = new Date();
  // year = this.date.getFullYear();
  year = (new Date()).getFullYear();

    bricks: Brick[];

  constructor(
    private service: BrickService
  ) { }

  title:string;
  
  ngOnInit() {
    this.service.getBricks().then( (bricks)   => this.bricks = bricks);
     EmitterService.get('term').subscribe((title:string) => {this.title = title})
  }

  // title: string = 'hello world';


  // for mansory style
  public myOptions: MasonryOptions = {
  transitionDuration: '0.8s',
  itemSelector: '.brick',
  columnWidth: 180,
  fitWidth: true
  // columnWidth: '.brick-sizer',
};

   changeLoveCount(brick) {
     if ( !brick.isLoved ) {
       brick.loveCount += 1;
       console.log(brick.loveCount);
       brick.isLoved = !brick.isLoved;
     } else {
       brick.loveCount -= 1;
       brick.isLoved = !brick.isLoved;
     }


   }

   changeShareCount(brick) {
     if ( !brick.isShared ) {
       brick.shareCount += 1;
       console.log(brick.shareCount);
       brick.isShared = !brick.isShared;
     } else {
       brick.shareCount -= 1;
       brick.isShared = !brick.isShared;
     }
   }






     filterCategory(category) {
       this.service.getBricks(category).then( bricks =>
       {
         this.bricks = bricks;
       });
     }



     searchNote(term) {
       term = term.toString().toLowerCase().trim();
       console.log(term)
       this.service.searchBricks(term).then( (bricks)   =>{
         console.log(bricks);
          return this.bricks = bricks;
       });
     }


}
