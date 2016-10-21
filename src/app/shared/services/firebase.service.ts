import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
  notes: FirebaseListObservable<Note[]>;
  // categories: FirebaseListObservable<Category[]>;


  constructor(private af: AngularFire) {  }

  getNotes(noteType:string = null) {
    console.log("action getNotes at firebase Service: " + noteType)
      if (noteType != null && noteType != 'refesh' ) {
      console.log('return by category...')
      this.notes = this.af.database.list('notes',{
        query: {
          orderByChild: 'noteType',
          equalTo: noteType
        }
      }) as FirebaseListObservable<Note[]>;
    } else if (noteType == 'refesh' ) {
            console.info('return is all...')
      this.notes = this.af.database.list('notes') as FirebaseListObservable<Note[]>;
    } else {
      console.info('return is NONE !')
    }
    return this.notes;
  }

  searchNotes(term) {
    console.log("action searchNotes at firebase Service: " + term)
    this.notes = this.af.database.list('notes') as FirebaseListObservable<Note[]>;
    return this.notes;
}

  // getCategories() {
  //   this.categories = this.af.database.list('categories') as FirebaseListObservable<Category[]>;
  //   return this.categories;
  // }

  addNote(newNote) {
    console.info(newNote)
    const items = this.af.database.list('notes');
    return items.push(newNote);
  }

  updateNote(key, updatedNote) {
    const items = this.af.database.list('notes');
    return items.update(key,updatedNote);
  }

  deleteNote(key) {
    this.notes.remove(key);
  }

}


export interface Note {
  noteType: string;
  loveCount: number;
  isLoved: boolean;
  shareCount: number;
  isShared: boolean;
  from: string;
  to: string;
  id: string;
  author: string;
  content: string;
}

// export interface User {
//   email: string;
//   password: string;
//
//
// }
