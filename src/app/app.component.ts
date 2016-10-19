import { Component , OnInit } from '@angular/core';

import { EmitterService, Term } from './shared/services/emitter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
    title:string = 'app works!';

    constructor(private emitterService: EmitterService) {}

    termObject: Term = { term:'', category: null};
    searchNote() {
      this.emitterService.setTerm(this.termObject);
    }

    filterCategory(typeNote) {
      this.termObject.category = typeNote;
      this.emitterService.setTerm(this.termObject);
    }

}
