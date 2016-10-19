import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class Term {
  term: string;
  category: string;
}

@Injectable()
export class EmitterService {

  private termObject: Term;
  private subject: Subject<Term> = new Subject<Term>();

  setTerm(termObject: Term): void {
    this.termObject = termObject;
    this.subject.next(termObject);
  }

  getTerm(): Observable<Term> {
    return this.subject.asObservable();
  }
}

// import { EventEmitter } from '@angular/core';
//
// export class EventEmitterService {
//     // Event store
//     private static _emitters: { [ID: string]: EventEmitter<any> } = {};
//     // Set a new event in the store with a given ID
//     // as key
//     static get(ID: string): EventEmitter<any> {
//         if (!this._emitters[ID])
//             this._emitters[ID] = new EventEmitter();
//         return this._emitters[ID];
//     }
// }
