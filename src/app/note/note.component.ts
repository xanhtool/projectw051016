import { Component, OnInit ,ViewEncapsulation, Input , EventEmitter, Output} from '@angular/core';

import { EmitterService, Term } from '../shared/services/emitter.service';
import { BrickService } from '../shared/services/brick.service';
import { Brick } from '../shared/models/brick';
import { MasonryOptions } from 'angular2-masonry';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseService } from '../shared/services/firebase.service';

export interface FirebaseAuthState {
  uid: string;
  provider: AuthProviders;
  auth: firebase.User;
  expires?: number;
  github?: firebase.UserInfo;
  google?: firebase.UserInfo;
  twitter?: firebase.UserInfo;
  facebook?: firebase.UserInfo;
  anonymous?: boolean;
}

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
    authState;
    currentUser;
    bricks: Brick[];
    TermObject: Term;
    items: FirebaseListObservable<any[]>;
  constructor(
    private service: BrickService,
    private emitterService: EmitterService,
    private af: AngularFire,
    private firebaseService: FirebaseService
  ) {
    // firebase part
    // Email and password
    af.auth.login({
      email: 'hiepsieuviet@hotmail.com',
      password: 'developer',
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    });

    // this.authState = af.auth.getAuth();
     af.auth.subscribe((state: FirebaseAuthState) => {
         this.authState = state;
        //  console.log(this.authState)
         this.currentUser = state.uid;
     });
    // see authentication status
    // this.af.auth.subscribe(auth => console.log(auth));

    this.items = af.database.list('items');


      // emmiter transfer from PARENT
      this.emitterService.getTerm().subscribe(TermObject => {

        // emmiter transfer term string
      this.TermObject = TermObject;
      console.log("Term insert from keyboard: |" + TermObject.term);
      console.log("Category insert from keyboard: |" + TermObject.category);


      // if user clear typing then we fetch all data
      if (TermObject.term == '' && TermObject.category == null) {
        console.info('only doing refeshing.....');
        this.filterCategory('refesh');
      } else if ( TermObject.term != '' && TermObject.category == null ) {
        console.info('doing filtering by term: ' + TermObject.category);
          this.searchNote(TermObject.term);
      }

      // do filter Category
      if (TermObject.category != null) {
        console.info('doing filtering category: ' + TermObject.category);
        this.filterCategory(TermObject.category);
      }
    });

  }



  title:string;

  ngOnInit() {
    // this.service.getBricks().then( (bricks)   => this.bricks = bricks);
    this.firebaseService.getNotes('refesh').subscribe( notes => {
      this.bricks = notes.reverse();
      console.info('just init the first run!')
    })

    this.activedKey = null;
  }


  // for mansory style
  public myOptions: MasonryOptions = {
  transitionDuration: '0.8s',
  itemSelector: '.brick',
  columnWidth: 180,
  fitWidth: true
  // columnWidth: '.brick-sizer',
};
   activedKey: string = null;
   changeLoveCount(brick) {
    //  using template variable to store $key
     this.activedKey = brick.$key
    //  increase love count
     brick.loveCount += 1
    //  remove unnecessary key in object
     delete brick.$key
     delete brick.$exists
     this.updateNote(this.activedKey,brick);
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
      //  this.service.getBricks(category).then( bricks =>
      //  {
      //    this.bricks = bricks;
      //  });
        // if (category == null) {
        //   console.log('stop fetching')
        // }else {
          this.firebaseService.getNotes(category).subscribe( notes => {
            // console.log(notes)
            this.bricks = notes.reverse();
            // console.log(this.bricks)
          })
        // }
     }


     searchNote(term) {
      this.firebaseService.searchNotes(term).subscribe( notes => {
        this.bricks= notes.filter(note => {
          return note.id.toString().toLowerCase() == term;
        })
      });
     }

     deleteNote(key:string) {
       this.firebaseService.deleteNote(key)
     }

     updateNote(key:string, updNote) {
       this.firebaseService.updateNote(key, updNote);
     }

     eventCreateForm;
    createForm(event) {
      // console.log(event)
      this.eventCreateForm = event
    }

    

}
