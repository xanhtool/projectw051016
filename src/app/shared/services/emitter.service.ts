import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class Term {
  term: string;
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
