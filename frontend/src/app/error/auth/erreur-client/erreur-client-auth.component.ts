import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auth-client',
  templateUrl: './erreur-client-auth.component.html',
  styleUrls: ['./erreur-client-auth.component.scss']
})
export class ErreurClientAuthComponent implements OnInit {

  @Input() errorClient :string;

  constructor() { }

  ngOnInit(): void {
  }

}
