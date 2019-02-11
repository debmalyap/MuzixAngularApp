import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  watchListApi: boolean;
  name: string;
  constructor() {
    console.log('searchtest' , this.name);
  }


  input(value) {
    console.log(value);

  }
  ngOnInit() {
    this.input(this.name);
    console.log('searchtest' , this.name);
  }

}
