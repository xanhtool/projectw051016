import { Component , ViewEncapsulation, OnInit } from '@angular/core';
import { MasonryOptions } from 'angular2-masonry';

import { BrickService } from './brick.service';
import { Brick } from './brick.ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    title = 'app works!';
  // date = new Date();
  // year = this.date.getFullYear();
  year = (new Date()).getFullYear();
  bricks;
  term: string;
  constructor (
    private service: BrickService,
  ) {}


  ngOnInit() {
    this.service.getBricks().then( (bricks)   => this.bricks = bricks);
    // this.service.searchBricks("1171").then( (bricks)   =>{
    //   console.log(bricks);
    //    return this.bricks = bricks;
    // });
  }

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
