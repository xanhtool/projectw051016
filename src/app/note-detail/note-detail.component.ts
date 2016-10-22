import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  noteid;
  brick;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {
  }
  sub:any;
  ngOnInit () {
     this.sub=this.route.params.subscribe( params => {
       let id = params['noteid'];
       console.log(id)
       console.log(this.route.snapshot.params['noteid'])
       this.firebaseService.getNote(id).subscribe( note => {
         return this.brick = note;
       });
     })
  }

  ngOnDestroy() {
    console.log(this.brick)
  }

}
