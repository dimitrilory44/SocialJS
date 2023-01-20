import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/_services/web-socket.service';
import { Comment } from '../../../models/Comment.models';
import { User } from '../../../models/User.models';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() postId ?:number;
  @Input() comments ?:Comment[];
  @Input() myUser :User;

  commentTemp ?: any;

  constructor(private _webService :WebSocketService) {}

  ngOnInit(): void {
    this._webService.getNewMessage().subscribe((message: any) => {
      this.commentTemp = message;
    });
  }
}