import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-serveur',
  templateUrl: './erreur-serveur.component.html',
  styleUrls: ['./erreur-serveur.component.scss']
})
export class ErreurServeurComponent implements OnInit {

  @Input() error :string;

  constructor() { }

  ngOnInit(): void {
  }

}
