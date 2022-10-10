import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentListInterface, PostListInterface } from 'src/app/model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService{
  baseURL = ' https://jsonplaceholder.typicode.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  getPostsList() : Observable<PostListInterface[]> {
    return this.httpClient.get<PostListInterface[]>(this.baseURL+'/posts');
  }

  getPostsByID(id: number): Observable<PostListInterface> {
    return this.httpClient.get<PostListInterface>(this.baseURL+`/posts/${id}`)
  }

  getCommentByID(id: number): Observable<CommentListInterface[]> {
    return this.httpClient.get<CommentListInterface[]>(this.baseURL+`/comments?postId=${id}`)
  }

}
