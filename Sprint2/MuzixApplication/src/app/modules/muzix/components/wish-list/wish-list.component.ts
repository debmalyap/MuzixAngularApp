import { Component, OnInit } from '@angular/core';
import { MuzixService } from '../../muzix.service';
import { Track } from '../../Track';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  tracks: Array<Track>;
  message: string;
   watchListApi  = true;
  constructor(private muzixService: MuzixService , private snackBar: MatSnackBar) {
    this.tracks = [];
   }


  ngOnInit() {

    this.message = 'Wishlist is empty';
  this.muzixService.getAllWishListTrack1().subscribe(data => {
    if ( data.length === 0) {
      this.snackBar.open('WishList is empty', '', {
        duration: 1000
      });
    }
      // console.log('data coming ' , typeof(data));
      this.tracks = data;
    });

    // if ( this.tracks.length === 0) {
    //   console.log('tracks length',this.tracks.length);
    // }

}

deleteFromWishlist(track: Track) {
// console.log('Track to be deleted' , track);
this.muzixService.deleteTrackFromWishList(track).subscribe((data) => {
  console.log('result' , data);
  // this.snackBar.open('deleted', '' , {
    // duration: 1000
 // });
});

// const index = this.tracks.indexOf(track);
// this.tracks.splice(index, 1);

}

updateComments(track: Track) {
  console.log('in wishlist');
 this.muzixService.updateComments(track).subscribe((data) => {
   console.log('data' , data);
   this.snackBar.open('Successfully updated', '' , {
    duration: 1000
  });
},
error => {
 console.log('error' , error);
}
);
}
}
