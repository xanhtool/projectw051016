import { Component, OnInit, Output, EventEmitter , SimpleChange , Input} from '@angular/core';
import { Brick } from '../../shared/models/brick';
@Component({
  selector: 'create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  noteTypes = [
    {value:'love',
    display: 'Yêu Thương'},
    {value:'thank',
    display: 'Cảm Ơn'},
    {value:'sorry',
    display: 'Xin Lỗi'},
    {value:'forever',
    display: '5 Ngày Cho Mãi Mãi'}
  ]

  constructor() { }

  ngOnInit() {
    this. active = false ;
  }

  @Output() noteCreated = new EventEmitter();
    newNote = new Brick();
    active: boolean = false ;

    onSubmit() {
      //show event that the user was created
      this.newNote = new Brick();
      this.noteCreated.emit({note:this.newNote})
      console.log("Closing form...")
      this.active = false; // disappear component
      // setTimeout (() => this.active= true,0); // call fresh component
    }
    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.newNote); }


@Input() reciever: any;
  ngOnChanges(changes: SimpleChange) {
    // console.log("something is changed")
    // console.log(changes)
    // console.log(this.reciever)
    console.log("Opening form...")
    this.active = true;
  }

}
