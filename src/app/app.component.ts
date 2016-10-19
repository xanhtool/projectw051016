import { Component , OnInit } from '@angular/core';

import { EmitterService } from './shared/services/emitter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
    title:string = 'app works!';
    demo(){
      EmitterService.get('term').emit(this.title);
    }


}
