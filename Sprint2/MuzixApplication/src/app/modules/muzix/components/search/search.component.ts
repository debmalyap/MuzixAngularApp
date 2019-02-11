import { Component, OnInit } from '@angular/core';
import { MuzixService } from '../../muzix.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  values: string;

  onKey(event: any) { // without type info
    // this.values += event.target.value + ' | ';
    this.values = event.target.value;
    console.log(this.values);
    this.muzixService.filterArtists(this.values);
  }
  constructor(private muzixService: MuzixService) {
    console.log('name' , this.values);
  }

  ngOnInit() {
// console.log('values' , this.values);
}

}
