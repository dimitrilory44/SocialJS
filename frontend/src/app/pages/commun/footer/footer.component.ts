import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  numVersion :string = VERSION.major;
  date :Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
