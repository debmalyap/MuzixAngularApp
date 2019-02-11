import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
country: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const data = this.route.data.subscribe( country => {
      this.country = country.country;
      console.log('country' , country.country);
    });
  }

}
