import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Track } from '../../Track';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  comments: string;
  newComments: string;
  track: Track;
  actionType: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Track) {
  // this.comments = data.comments;
 // this.track = data.obj;
  // this.actionType = data.actionType;
    console.log('In dialog constructor' , data);
    console.log('only comments are ' , data.comments);
    this.comments = data.comments;
   }

  ngOnInit() {
    console.log('In dialog ngonint' , this.data);
  }

  onNoClick() {
    this.dialogRef.close(this.comments);
  }

  updateComments() {
    console.log('The comments are' , this.comments);
   // this.track.comments = this.comments;
    this.dialogRef.close(this.comments);
  }


}
