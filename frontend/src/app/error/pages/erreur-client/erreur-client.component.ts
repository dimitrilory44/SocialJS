import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-client',
  templateUrl: './erreur-client.component.html',
  styleUrls: ['./erreur-client.component.scss']
})
export class ErreurClientComponent implements OnInit {

  @Input() errorClient :string;

  constructor() { }

  ngOnInit(): void {
  }

}
