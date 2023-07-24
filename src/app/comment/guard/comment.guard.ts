import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IComment } from '../IComment';
import { CommentService } from '../service/comment.service';

@Injectable({
  providedIn: 'root',
})
export class CommentGuard implements Resolve<IComment[]> {
  constructor(private commentService: CommentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IComment[] | Observable<IComment[]> | Promise<IComment[]> {
    return this.commentService.getComments();
  }
}
