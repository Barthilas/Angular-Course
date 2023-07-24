import { Component, OnInit } from '@angular/core';
import { CommentService } from './service/comment.service';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs';
import { IComment } from './IComment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute
  ) {}

  comments$ = this.commentService.getComments();

  // resolve guard, fetch data before navigating. (Pre-fetch)
  comment$ = this.activatedRoute.data.pipe(pluck('comments'));

  comments: IComment[] = [];

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      console.log(data);
      console.log(data['comments']);
      this.comments = data['comments'];
    });
  }
}
