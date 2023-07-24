import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComment } from '../IComment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments() {
    return this.http.get<IComment[]>('https://jsonplaceholder.typicode.com/comments');
  }
}
