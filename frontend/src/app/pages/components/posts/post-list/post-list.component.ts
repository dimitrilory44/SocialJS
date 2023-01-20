import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/Post.models';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() postList ?:Post[];
  @Input() errorServeur ?: string = '';
  
  errorMessage ?:string = '';

  constructor() { }

  ngOnInit(): void { }
}