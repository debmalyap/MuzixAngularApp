import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { Track } from '../../Track';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  comments: string;
  @Input()
  track: Track;
  @Input()
  statusCode: number;
  @Input()
  watchListApi: boolean;
  @Output()
  addToWishList  = new EventEmitter();
  @Output()
  deleteFromWishlist = new EventEmitter();
  @Output()
  updateComments = new EventEmitter();
  status: boolean;

  // @Output()
    // updateComments = new EventEmitter();
  constructor(public dialog: MatDialog ) { }

  ngOnInit() {
  }

  onClickMe(track: Track) {
    console.log('default value of boolean' , this.watchListApi);
    console.log('track is 123' , track);
  this.addToWishList.emit(track);
   }

   deleteTrack(track: Track) {
     console.log('track is 1234', track);
     this.deleteFromWishlist.emit(track);


   }
   addComments(actionType): void {
     console.log('in add comments');
    const dialogRef = this.dialog.open(DialogComponent, {

      width: '55vh',
      height: '30vh',
      data: { trackId : this.track.trackId , comments : this.track.comments }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' , result);
      // this.comments = result;
      this.track.comments = result;
       this.updateComments.emit(this.track);
   // console.log('In Card comments' , result);
    });
}
}


